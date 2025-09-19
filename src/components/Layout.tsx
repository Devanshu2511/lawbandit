import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, ShareIcon, GraduationCapIcon, CreditCardIcon, PlusCircleIcon, UserCircleIcon, BellIcon, SearchIcon, MenuIcon, XIcon } from 'lucide-react';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <div className="flex h-screen bg-background-dark text-white">
      {/* Mobile menu button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-background-card shadow-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <XIcon size={20} className="text-white" /> : <MenuIcon size={20} className="text-white" />}
      </button>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out lg:relative lg:translate-x-0 z-40 w-64 bg-background-sidebar border-r border-gray-800 shadow-sm`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-white p-2">
                <BookOpenIcon size={24} />
              </div>
              <span className="text-xl font-bold text-white">LawBandit</span>
            </Link>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link to="/" className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${isActive('/') ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
              <HomeIcon size={18} className="mr-3" />
              Home
            </Link>
            <Link to="/new-class" className="flex items-center px-4 py-3 text-sm text-gray-400 rounded-lg hover:text-white transition-colors">
              <PlusCircleIcon size={18} className="mr-3" />
              New Class
            </Link>
            <Link to="/" className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${isActive('/classes') ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
              <BookOpenIcon size={18} className="mr-3" />
              Classes
            </Link>
            <div className="pt-4 pb-2">
              <div className="h-px bg-gray-800"></div>
            </div>
            <Link to="/shared" className="flex items-center px-4 py-3 text-sm text-gray-400 rounded-lg hover:text-white transition-colors">
              <ShareIcon size={18} className="mr-3" />
              Shared
            </Link>
            <Link to="/tutorials" className="flex items-center px-4 py-3 text-sm text-gray-400 rounded-lg hover:text-white transition-colors">
              <GraduationCapIcon size={18} className="mr-3" />
              Tutorials
            </Link>
            <Link to="/subscribe" className="flex items-center px-4 py-3 text-sm text-gray-400 rounded-lg hover:text-white transition-colors">
              <CreditCardIcon size={18} className="mr-3" />
              Subscribe
            </Link>
          </nav>
          {/* User profile */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                  <UserCircleIcon size={24} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Jane Cooper
                </p>
                <p className="text-xs text-gray-500 truncate">Law Student</p>
              </div>
              <div>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-300">
                  <span className="sr-only">View settings</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-background-sidebar z-10 border-b border-gray-800">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex">
                <div className="max-w-lg w-full lg:max-w-xs relative">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon size={16} className="text-gray-500" />
                    </div>
                    <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-background-card placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent-yellow focus:border-accent-yellow text-white sm:text-sm" placeholder="Search" type="search" />
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
                  <span className="sr-only">View notifications</span>
                  <BellIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background-dark">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default Layout;