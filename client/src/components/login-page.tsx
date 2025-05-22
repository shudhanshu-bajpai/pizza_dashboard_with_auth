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

  const handleGoogleSignIn = () => {
    setAuthLoading(true);
    setAuthError(false);
    
    // Redirect to Google OAuth
    window.location.href = '/api/auth/google';
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
          
          {/* Google Sign In Button */}
          <Button
            variant="outline"
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
            onClick={handleGoogleSignIn}
            disabled={authLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-900 font-medium">Sign in with Google</span>
          </Button>
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            Secure authentication using your Google account
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
