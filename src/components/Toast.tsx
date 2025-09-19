// Toast notification component
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

export function Toast() {
  const { currentToast, hideToast } = useToast();

  useEffect(() => {
    if (currentToast) {
      const timer = setTimeout(hideToast, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentToast, hideToast]);

  if (!currentToast) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`max-w-md rounded-lg shadow-lg p-4 ${
        currentToast.variant === "destructive" 
          ? "bg-red-50 border border-red-200" 
          : "bg-green-50 border border-green-200"
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {currentToast.variant === "destructive" ? (
              <XCircle className="h-5 w-5 text-red-400" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${
              currentToast.variant === "destructive" ? "text-red-800" : "text-green-800"
            }`}>
              {currentToast.title}
            </h3>
            {currentToast.description && (
              <p className={`mt-1 text-sm ${
                currentToast.variant === "destructive" ? "text-red-700" : "text-green-700"
              }`}>
                {currentToast.description}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={hideToast}
              className={`inline-flex rounded-md p-1.5 ${
                currentToast.variant === "destructive"
                  ? "text-red-500 hover:bg-red-100"
                  : "text-green-500 hover:bg-green-100"
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}