function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function importLoginPublicKey(spkiBase64) {
  return crypto.subtle.importKey(
    'spki',
    base64ToArrayBuffer(spkiBase64),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );
}

export async function encryptLoginPayload(publicKey, { username, password }) {
  const payload = JSON.stringify({
    username,
    password,
    ts: Date.now(),
  });
  const encoded = new TextEncoder().encode(payload);
  const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);
  return arrayBufferToBase64(encrypted);
}