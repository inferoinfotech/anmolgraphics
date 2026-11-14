'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { encryptLoginPayload, importLoginPublicKey } from '@/lib/adminLoginCryptoClient';
import { useAdminToaster, validateAdminLoginForm } from '@/components/Admin/AdminToaster';
import { adminBtnPrimary, adminBtnIconMuted } from '@/components/Admin/adminButtonClasses';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [authFailed, setAuthFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginKeyReady, setLoginKeyReady] = useState(false);
  const [publicKeyCrypto, setPublicKeyCrypto] = useState(null);
  const router = useRouter();
  const { toast, Toaster } = useAdminToaster();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.push('/admin/dashboard');
            router.refresh();
          }
        }
      } catch (err) {
        console.error('Session check failed:', err);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const loadPublicKey = async () => {
      try {
        const res = await fetch('/api/admin/login', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load login key');
        const data = await res.json();
        const key = await importLoginPublicKey(data.publicKey);
        setPublicKeyCrypto(key);
        setLoginKeyReady(true);
      } catch (err) {
        console.error(err);
        toast('Could not initialize secure login. Please refresh the page.', 'error', 6000);
      }
    };
    loadPublicKey();
  }, [toast]);

  const clearFieldError = (field) => {
    setAuthFailed(false);
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setAuthFailed(false);

    const validationErrors = validateAdminLoginForm(username, password);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      toast('Please correct the highlighted fields.', 'error');
      return;
    }

    if (!loginKeyReady || !publicKeyCrypto) {
      toast('Secure login is still loading. Please wait a moment.', 'info');
      return;
    }

    setLoading(true);

    try {
      const payload = await encryptLoginPayload(publicKeyCrypto, {
        username: username.trim(),
        password,
      });

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPassword('');
        toast('Login successful! Redirecting to dashboard…', 'success', 3000);
        setTimeout(() => {
          router.push('/admin/dashboard');
          router.refresh();
        }, 800);
        return;
      }

      if (res.status === 401) {
        setAuthFailed(true);
        setFieldErrors({
          password: 'Incorrect username or password.',
        });
        toast(data.error || 'Invalid credentials. Please try again.', 'error');
      } else if (res.status === 400) {
        toast(data.error || 'Invalid login request.', 'error');
      } else if (res.status >= 500) {
        toast(data.error || 'Server error. Try again later.', 'error');
      } else {
        toast(data.error || 'Login failed. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      toast('Network error. Check your connection and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputErrorClass = (field) =>
    fieldErrors[field] || (authFailed && field === 'username')
      ? 'border-red-300 focus:ring-red-500/30 focus:border-red-400'
      : 'border-ag-border focus:ring-ag-primary focus:border-transparent';

  return (
    <div className="min-h-screen bg-ag-canvas flex items-center justify-center p-4">
      <Toaster />

      <div className="w-full max-w-md bg-ag-card rounded-xl shadow-xl border border-ag-border overflow-hidden">
        <div className="bg-ag-sidebar px-8 py-10 text-center">
          <img
            src="/assets/images/erasebg-transformed.png"
            alt="Anmol Graphics Logo"
            className="w-44 mx-auto mb-4 bg-white/10 p-2 rounded-lg backdrop-blur-md"
          />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Admin Portal
          </h2>
          <p className="text-ag-sidebar-text/90 text-xs mt-1">
            Secure admin access for Anmol Graphics
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearFieldError('username');
                }}
                placeholder="Enter your username"
                aria-invalid={Boolean(fieldErrors.username || authFailed)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-sm text-ag-ink ${inputErrorClass('username')}`}
              />
              {fieldErrors.username?.trim() ? (
                <p id="username-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.username.trim()}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError('password');
                  }}
                  placeholder="••••••••"
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition text-sm text-ag-ink ${inputErrorClass('password')}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${adminBtnIconMuted}`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.password ? (
                <p id="password-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.password}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading || !loginKeyReady}
              className={`w-full py-3.5 ${adminBtnPrimary} active:scale-[0.98] ${
                loading || !loginKeyReady ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Authenticating...
                </>
              ) : !loginKeyReady ? (
                'Preparing secure login...'
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}