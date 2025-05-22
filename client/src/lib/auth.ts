import { apiRequest } from "./queryClient";
import { User } from "@shared/schema";

// Authentication service for handling API requests
export const authService = {
  // Get the current session
  async getSession(): Promise<{ user: User } | null> {
    try {
      const res = await fetch("/api/auth/session", {
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          return null;
        }
        throw new Error("Failed to get session");
      }
      
      return await res.json();
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  },

  // Login with Demo User
  async loginWithDemo(): Promise<User | null> {
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        throw new Error("Failed to login");
      }
      
      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },
};
