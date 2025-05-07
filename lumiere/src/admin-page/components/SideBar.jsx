import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  Users,
  UserCog,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeSection, onNavigate, isSidebarOpen, setIsSidebarOpen }) => {
  // State for hover animations
  const [hoveredItem, setHoveredItem] = useState(null);
  // State for logout confirmation dialog
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Navigation items with icons
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'products', name: 'Products', icon: <Box size={20} /> },
    { id: 'orders', name: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'customers', name: 'Customers', icon: <Users size={20} /> },
    { id: 'user-management', name: 'User Management', icon: <UserCog size={20} /> },
    { id: 'reports', name: 'Reports', icon: <BarChart2 size={20} /> },
  ];

  // Function to handle navigation item click
  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    onNavigate(id);
    // On mobile view, close the sidebar after clicking a menu item
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Handle escape key to close sidebar and logout dialog
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        } else if (isSidebarOpen) {
          setIsSidebarOpen(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen, setIsSidebarOpen, showLogoutConfirm]);

  // Handle logout confirmation
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  // Handle actual logout and navigation
  const confirmLogout = () => {
    // Close the dialog
    setShowLogoutConfirm(false);
    // Here you would typically clear authentication tokens/session
    // For example: localStorage.removeItem('authToken');
    
    // Navigate to guest page
    window.location.href = '/'; // Or use router if available: router.push('/');
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-20 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Toggle button for mobile */}
      <button 
        className={`
          lg:hidden fixed z-30 rounded-r-lg bg-blue-600 text-white p-2
          shadow-lg transition-all duration-300 focus:outline-none
          ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}
        `}
        style={{ top: '1rem', left: isSidebarOpen ? '-100%' : '0' }}
        onClick={() => setIsSidebarOpen(true)}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Sidebar */}
      <div className={`
        bg-gradient-to-b from-gray-900 to-gray-800 text-white
        w-64 h-screen overflow-y-auto z-30
        fixed lg:sticky top-0 left-0
        transform transition-all duration-300 ease-in-out
        shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between py-6 px-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              AdminHub
            </h1>
          </div>
          <button 
            className="lg:hidden text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4 px-2">
          <div className="text-xs uppercase text-gray-400 font-semibold px-4 mb-2">Main Menu</div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a 
                  href="#"
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    relative overflow-hidden
                    ${activeSection === item.id 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}
                  `}
                  onClick={handleNavClick(item.id)}
                  style={{textDecoration: "none"}}
                >
                  {/* Background animation on hover */}
                  {hoveredItem === item.id && activeSection !== item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent animate-shimmer" 
                    style={{ 
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite'
                    }}></div>
                  )}
                  
                  {/* Icon with pulse animation for active item */}
                  <span className={`
                    flex items-center justify-center w-8 h-8 mr-3 rounded-md
                    ${activeSection === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 group-hover:text-white'
                    }
                  `}>
                    {item.icon}
                    {activeSection === item.id && (
                      <span className="absolute w-8 h-8 rounded-md animate-ping bg-white/20 opacity-75"></span>
                    )}
                  </span>
                  
                  {/* Text with slide-in effect */}
                  <span className={`transform transition-transform duration-300 ${
                    hoveredItem === item.id && activeSection !== item.id ? 'translate-x-1' : 'translate-x-0'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Indicator for active item */}
                  {activeSection === item.id && (
                    <span className="absolute right-2 h-2 w-2 rounded-full bg-white"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          
          {/* User section at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
            
            {/* Logout button */}
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm rounded-lg text-gray-300 hover:text-white hover:bg-red-600/80 transition-colors focus:outline-none"
            >
              <LogOut size={16} className="mr-2" />
              <span>Log Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center">
            {/* Dialog */}
            <div className="bg-white rounded-lg shadow-xl w-80 max-w-md z-50 overflow-hidden transform transition-all">
              <div className="px-6 py-4">
                <div className="text-lg font-medium text-gray-900 mb-2">
                  Confirm Logout
                </div>
                <p className="text-sm text-gray-600">
                  Are you sure you want to log out? You will be redirected to the guest page.
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmLogout}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Log Out
                </button>
                <button
                  type="button"
                  onClick={cancelLogout}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Keyframe animation for shimmer effect
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
document.head.appendChild(styleTag);

export default Sidebar;