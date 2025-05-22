import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Close sidebar when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isMobile]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
}
