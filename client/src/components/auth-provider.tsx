import { createContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { authService } from "@/lib/auth";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./loading-spinner";

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Fetch the user session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const session = await authService.getSession();
        
        if (session?.user) {
          setUser(session.user);
          // If user is at root, redirect to welcome page
          if (window.location.pathname === "/") {
            setLocation("/welcome");
          }
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem checking your login status.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [setLocation, toast]);

  // Login function using demo account
  const login = async () => {
    try {
      setIsLoading(true);
      const user = await authService.loginWithDemo();
      if (user) {
        setUser(user);
        setLocation("/welcome");
        toast({
          title: "Logged in",
          description: "You are now logged in as Demo User.",
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Login Error",
        description: "There was a problem signing in.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setLocation("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Logout Error",
        description: "There was a problem logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create the auth context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  // Show loading spinner if initial auth check is in progress
  if (isLoading && !user) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
