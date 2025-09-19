// Query client for TrendifyGo - from javascript_auth_all_persistance integration
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

// Use relative URLs for better dev proxy support and production compatibility
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export async function apiRequest(method: string, url: string, body?: any) {
  const fullUrl = `${API_BASE_URL}${url}`;
  console.log(`🌐 API Request: ${method} ${fullUrl}`);
  
  const response = await fetch(fullUrl, {
    method,
    credentials: "include", // Important for sessions
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  return response;
}

export function getQueryFn({ on401 = "throw" }: { on401?: "throw" | "returnNull" } = {}) {
  return async ({ queryKey }: { queryKey: string[] }) => {
    try {
      const response = await apiRequest("GET", queryKey[0]);
      return await response.json();
    } catch (error: any) {
      if (error.message.includes("401") && on401 === "returnNull") {
        return null;
      }
      throw error;
    }
  };
}