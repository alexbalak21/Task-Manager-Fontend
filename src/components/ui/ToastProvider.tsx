import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";


type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (input: ToastInput) => void;
  success: (title: string, description?: string, duration?: number) => void;
  error: (title: string, description?: string, duration?: number) => void;
  info: (title: string, description?: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastVariant, string> = {
  success: "bg-emerald-50 text-emerald-900",
  error: "bg-rose-50 text-rose-900",
  info: "bg-sky-50 text-sky-900",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(1);
  const timeoutIdsRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timeoutId = timeoutIdsRef.current[id];
    if (timeoutId) {
      clearTimeout(timeoutId);
      delete timeoutIdsRef.current[id];
    }
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = "info", duration = 2500 }: ToastInput) => {
      const id = nextIdRef.current;
      nextIdRef.current += 1;

      setToasts((prev) => [...prev, { id, title, description, variant }]);

      timeoutIdsRef.current[id] = setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast],
  );

  useEffect(() => {
    return () => {
      Object.values(timeoutIdsRef.current).forEach(clearTimeout);
      timeoutIdsRef.current = {};
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast,
      success: (title, description, duration) =>
        showToast({ title, description, duration, variant: "success" }),
      error: (title, description, duration) =>
        showToast({ title, description, duration, variant: "error" }),
      info: (title, description, duration) =>
        showToast({ title, description, duration, variant: "info" }),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed left-1/2 top-4 z-999 flex w-[min(92vw,24rem)] -translate-x-1/2 flex-col gap-3 sm:top-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm transition-all ${toastStyles[toast.variant]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold leading-5">{toast.title}</p>
                {toast.description ? <p className="mt-1 text-sm/5 opacity-90">{toast.description}</p> : null}
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-md px-2 py-1 text-xs font-semibold opacity-70 transition-opacity hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
