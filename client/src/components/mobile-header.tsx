interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <header className="md:hidden bg-white shadow-sm py-3 px-4 flex items-center justify-between sticky top-0 z-10">
      <button 
        className="text-gray-900" 
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <span className="material-icons">menu</span>
      </button>
      
      <h1 className="text-xl font-medium text-gray-900">Pizza Dashboard</h1>
      
      <div className="w-8"></div> {/* Spacer for alignment */}
    </header>
  );
}
