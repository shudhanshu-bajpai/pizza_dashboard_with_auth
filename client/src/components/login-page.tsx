import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.15)_0%,transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Main login card */}
      <div className="glass-card relative z-10 p-8 rounded-2xl max-w-md w-full border border-white/10">
        {/* Logo section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 mb-4 micro-interaction">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 9H14V4H5V19H19V9Z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Pizza Dashboard
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Modern pizza order management
          </p>
        </div>

        {/* Sign in section */}
        <div className="space-y-6">
          <Button
            onClick={handleDemoSignIn}
            disabled={authLoading}
            className="neuro-button w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {authLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Sign in with Demo Account</span>
              </div>
            )}
          </Button>
          
          {/* Demo notice */}
          <div className="glass-card p-4 rounded-xl border border-white/5">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">Demo Mode</p>
                <p className="text-xs text-gray-500 mt-1">
                  This demo uses mock authentication. In production, you would connect your preferred OAuth provider.
                </p>
              </div>
            </div>
          </div>
          
          {/* Error state */}
          {authError && (
            <div className="glass-card p-4 rounded-xl border border-red-500/20 bg-red-500/10">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p className="text-sm text-red-400 font-medium">
                  Authentication failed. Please try again.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            Powered by modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
}
