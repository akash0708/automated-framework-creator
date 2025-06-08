import React from 'react';
import { Bell, User, Menu, Search } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  return (
    <header className="h-14 border-b border-border bg-white sticky top-0 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="lg:hidden p-2 mr-2 rounded-md text-slate-500 hover:bg-slate-100"
            onClick={onMobileMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;