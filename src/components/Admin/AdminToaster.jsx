'use client';

import { useCallback, useState } from 'react';
import { AlertCircle, Check, Info, X } from 'lucide-react';

const TOAST_STYLES = {
  success: {
    container: 'bg-ag-lime/15 border-ag-lime/40 text-ag-olive',
    icon: 'text-ag-olive',
    Icon: Check,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-600',
    Icon: AlertCircle,
  },
  info: {
    container: 'bg-ag-sidebar border-ag-sidebar text-white',
    icon: 'text-white/80',
    Icon: Info,
  },
};

export function useAdminToaster() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = 'info', duration = 4500) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((current) => [...current, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  const Toaster = useCallback(
    function AdminToasterViewport() {
      return (
        <div
          className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4 sm:px-0"
          aria-live="polite"
          aria-atomic="true"
        >
          {toasts.map((item) => {
            const style = TOAST_STYLES[item.type] || TOAST_STYLES.info;
            const IconComponent = style.Icon;

            return (
              <div
                key={item.id}
                role="alert"
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-top-2 duration-200 ${style.container}`}
              >
                <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${style.icon}`} />
                <p className="text-sm font-medium flex-1 leading-snug">{item.message}</p>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  className="p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 transition shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      );
    },
    [toasts, dismiss]
  );

  return { toast, Toaster, dismiss };
}

export function validateAdminLoginForm(username, password) {
  const errors = {};
  const trimmedUsername = (username || '').trim();

  if (!trimmedUsername) {
    errors.username = 'Username is required.';
  } else if (trimmedUsername.length < 2) {
    errors.username = 'Username must be at least 2 characters.';
  } else if (trimmedUsername.length > 64) {
    errors.username = 'Username must be 64 characters or fewer.';
  } else if (!/^[a-zA-Z0-9_.@-]+$/.test(trimmedUsername)) {
    errors.username = 'Username contains invalid characters.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  } else if (password.length > 128) {
    errors.password = 'Password must be 128 characters or fewer.';
  }

  return errors;
}