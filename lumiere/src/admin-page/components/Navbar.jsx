import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ username, setIsSidebarOpen }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setNotificationOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
  
    // Remove user data
    localStorage.removeItem('currentUser');
  
    // Show toast message (if defined)
    if (typeof displayToast === 'function') {
      displayToast('Logged out successfully');
    }
  
    // Redirect to guest page
    setTimeout(() => {
      navigate('/');
    }, 500);
  };
  
  return (
    <nav className="bg-white shadow-sm w-full sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side with hamburger and title */}
        <div className="flex items-center">
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none mr-3"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
      
        </div>

        {/* Right-side icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 py-1 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                </div>
                <div className="px-4 py-2 text-sm text-gray-600">
                  <p className="text-center py-4">No new notifications</p>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
              onClick={toggleUserMenu}
            >
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {username ? username[0].toUpperCase() : 'A'}
              </div>
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                {username && (
                  <>
                    <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">👤 Profile</div>
                    <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">⚙️ Settings</div>
                    <hr className="my-1 border-gray-200" />
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  📤 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;