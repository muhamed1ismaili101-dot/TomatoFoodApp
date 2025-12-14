import { createContext, useContext, useEffect, useState } from "react";
import Toast from "../routes/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(type, message, duration = 3000) {
    setToast({ type, message, duration });
  }

  function closeToast() {
    setToast(null);
  }

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={closeToast}  
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
