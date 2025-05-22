import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loading-spinner";

export default function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Redirect to welcome page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/welcome");
    }
  }, [isAuthenticated, setLocation]);

  const handleDemoSignIn = async () => {
    setAuthLoading(true);
    setAuthError(false);
    
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(true);
      setAuthLoading(false);
    }
  };

  // If the global auth state is loading, don't show the login page yet
  if (isLoading && !authLoading) {
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center login-screen bg-cover bg-center"
         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")' }}>
      <Card className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <CardContent className="p-0">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Pizza Dashboard</h1>
          <p className="mb-8 text-gray-600 text-center">Sign in to access your dashboard</p>
          
          {/* Demo Sign In Button */}
          <Button
            variant="outline"
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
            onClick={handleDemoSignIn}
            disabled={authLoading}
          >
            <span className="material-icons mr-2 text-blue-500">account_circle</span>
            <span className="text-gray-900 font-medium">Sign in with Demo Account</span>
          </Button>
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            This is a demo version. In production, you would sign in with Google.
          </p>
          
          {/* Loading State */}
          {authLoading && (
            <div className="mt-4 flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2 text-gray-600">Authenticating...</span>
            </div>
          )}
          
          {/* Error State */}
          {authError && (
            <div className="mt-4 text-red-500 text-sm text-center">
              Authentication failed. Please try again.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
