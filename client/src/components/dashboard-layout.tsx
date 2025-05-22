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
    <div className="relative min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggle} />
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={toggle} />
      
      {/* Main Content */}
      <main className="md:ml-64 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
