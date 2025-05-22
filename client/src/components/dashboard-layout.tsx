import { ReactNode } from "react";
import Sidebar from "./sidebar";
import MobileHeader from "./mobile-header";
import { useSidebar } from "@/hooks/use-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="relative min-h-screen">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggle} />
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={toggle} />
      
      {/* Main Content */}
      <main className="md:ml-72 min-h-screen transition-all duration-300 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-teal-900/10 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
