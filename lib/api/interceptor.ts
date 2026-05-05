import { api } from "./base";

// Request interceptor (optional for future extensions)
api.interceptors.request.use(
  (config) => {
    // Add custom headers if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (for 401, 500, etc.)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      // network error
      return Promise.reject({ message: "Network Error" });
    }

    const { status } = error.response;

    if (status === 401) {
      // Not authenticated → force logout in AuthContext
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }

    return Promise.reject(error.response.data || error);
  }
);
