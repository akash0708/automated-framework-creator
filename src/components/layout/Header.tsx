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
          
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="py-1.5 pl-10 pr-4 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          
          <div className="flex items-center ml-2">
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center text-sm p-1.5"
                aria-label="User menu"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:block font-medium">Admin User</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;