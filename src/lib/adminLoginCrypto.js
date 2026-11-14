import crypto from 'node:crypto';

const DEV_KEYS = Symbol.for('anmol.adminLogin.devKeys');

function getDevKeyPair() {
  if (!global[DEV_KEYS]) {
    global[DEV_KEYS] = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
  }
  return global[DEV_KEYS];
}

export function getAdminLoginPrivateKeyPem() {
  const fromEnv = process.env.ADMIN_LOGIN_PRIVATE_KEY;
  if (fromEnv) {
    return fromEnv.replace(/\\n/g, '\n');
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_LOGIN_PRIVATE_KEY must be set in production');
  }
  return getDevKeyPair().privateKey;
}

export function getAdminLoginPublicKeySpkiBase64() {
  const privatePem = getAdminLoginPrivateKeyPem();
  const publicKey = crypto.createPublicKey(privatePem);
  const spkiDer = publicKey.export({ type: 'spki', format: 'der' });
  return spkiDer.toString('base64');
}

export function decryptLoginPayload(encryptedBase64) {
  const privatePem = getAdminLoginPrivateKeyPem();
  const encrypted = Buffer.from(encryptedBase64, 'base64');

  const decrypted = crypto.privateDecrypt(
    {
      key: privatePem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    encrypted
  );

  const parsed = JSON.parse(decrypted.toString('utf8'));
  if (
    typeof parsed.username !== 'string' ||
    typeof parsed.password !== 'string' ||
    typeof parsed.ts !== 'number'
  ) {
    throw new Error('Invalid login payload');
  }

  return parsed;
}

export function safeEqualString(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}