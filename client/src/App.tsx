import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/components/auth-provider";
import LoginPage from "@/components/login-page";
import ProtectedRoute from "@/pages/protected-route";
import WelcomePage from "@/pages/welcome-page";
import OrdersPage from "@/pages/orders-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/welcome">
        <ProtectedRoute>
          <WelcomePage />
        </ProtectedRoute>
      </Route>
      <Route path="/orders">
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
