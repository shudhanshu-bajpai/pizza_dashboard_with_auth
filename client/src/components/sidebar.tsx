import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import UserAvatar from "./user-avatar";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location === path;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside 
      className={`sidebar fixed top-0 left-0 h-full w-64 bg-white shadow-md z-20 
                  md:translate-x-0 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-4 border-b flex items-center">
        <img 
          src="https://pixabay.com/get/gdcce8e96fe64abf739d8763d6941052b212b227f6dfc8d0ac36e24dfffd5a3eb3c8b29aee1b3244aa15a078851d683dfb4c940e8f18f823f495885db21f76f71_1280.jpg" 
          alt="Pizza logo" 
          className="w-8 h-8 rounded mr-2"
        />
        <h2 className="text-lg font-medium text-gray-900">Pizza Dashboard</h2>
        <button 
          className="ml-auto md:hidden text-gray-600" 
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <span className="material-icons">close</span>
        </button>
      </div>
      
      <nav className="py-4">
        <ul>
          <li>
            <Link href="/welcome">
              <button 
                className={`sidebar-item flex items-center py-3 px-4 text-gray-600 hover:text-gray-900 w-full text-left
                            ${isActive("/welcome") ? "active bg-blue-50 text-blue-500 border-l-2 border-blue-500" : ""}`}
                onClick={() => onClose()}
              >
                <span className="material-icons mr-3">home</span>
                <span>Welcome</span>
              </button>
            </Link>
          </li>
          <li>
            <Link href="/orders">
              <button 
                className={`sidebar-item flex items-center py-3 px-4 text-gray-600 hover:text-gray-900 w-full text-left
                            ${isActive("/orders") ? "active bg-blue-50 text-blue-500 border-l-2 border-blue-500" : ""}`}
                onClick={() => onClose()}
              >
                <span className="material-icons mr-3">receipt</span>
                <span>Pizza Orders</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 w-full border-t p-4">
        {/* User Profile Section */}
        {user && (
          <div className="flex items-center mb-4">
            <UserAvatar user={user} />
            <div className="flex-1 min-w-0 ml-3">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-600 truncate">{user.email}</p>
            </div>
          </div>
        )}
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          className="flex items-center w-full py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          onClick={handleLogout}
        >
          <span className="material-icons mr-2">logout</span>
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
