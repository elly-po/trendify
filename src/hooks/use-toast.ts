// Simple toast hook for notifications
import { useState } from "react";

interface Toast {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toast, setToastState] = useState<Toast | null>(null);

  const showToast = (toastData: Toast) => {
    setToastState(toastData);
    // Auto-hide after 3 seconds
    setTimeout(() => setToastState(null), 3000);
  };

  return {
    toast: showToast,
    currentToast: toast,
    hideToast: () => setToastState(null),
  };
}