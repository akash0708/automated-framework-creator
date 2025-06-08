import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  X, 
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isOpen?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  active = false,
  onClick,
  hasChildren = false,
  isOpen = false,
  children
}) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center py-2 px-4 rounded-md text-sm font-medium mb-1",
          "transition-colors duration-150 ease-in-out",
          active 
            ? "bg-indigo-50 text-indigo-700" 
            : "text-slate-700 hover:bg-slate-100"
        )}
        onClick={onClick}
      >
        <span className="mr-3 text-xl">{icon}</span>
        <span>{label}</span>
        {hasChildren && (
          <ChevronDown 
            className={cn(
              "ml-auto h-4 w-4 transition-transform duration-200",
              isOpen ? "transform rotate-180" : ""
            )} 
          />
        )}
      </Link>
      {hasChildren && isOpen && (
        <div className="pl-11 mt-1 mb-2 space-y-1 max-h-full overflow-hidden transition-height">
          {children}
        </div>
      )}
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    frameworks: true
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center">
            <Layers className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold">Taxonomy Editor</span>
          </Link>
          <button
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={closeMobileMenu}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <NavItem 
              to="/" 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard"
              active={location.pathname === '/'} 
              onClick={closeMobileMenu}
            />

            <NavItem 
              to="/frameworks" 
              icon={<Layers size={18} />} 
              label="Frameworks"
              active={location.pathname.includes('/frameworks')} 
              hasChildren={true}
              isOpen={openMenus.frameworks}
              onClick={(e) => {
                e.preventDefault();
                toggleMenu('frameworks');
              }}
            >
              <Link 
                to="/frameworks" 
                className={cn(
                  "block py-2 text-sm font-medium rounded-md",
                  location.pathname === '/frameworks' 
                    ? "text-indigo-700" 
                    : "text-slate-600 hover:text-slate-900"
                )}
                onClick={closeMobileMenu}
              >
                View All Frameworks
              </Link>
              <Link 
                to="/frameworks/create" 
                className={cn(
                  "block py-2 text-sm font-medium rounded-md",
                  location.pathname === '/frameworks/create' 
                    ? "text-indigo-700" 
                    : "text-slate-600 hover:text-slate-900"
                )}
                onClick={closeMobileMenu}
              >
                Create New Framework
              </Link>
            </NavItem>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;