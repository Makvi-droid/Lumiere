import React from 'react';
import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  Users,
  UserCog,
  BarChart2,
  UserPlus,
  ClipboardList,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeSection, onNavigate, isSidebarOpen, setIsSidebarOpen }) => {
  // Navigation items with emoji icons
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard /> },
    { id: 'products', name: 'Products', icon: <Box /> },
    { id: 'orders', name: 'Orders', icon: <ShoppingCart /> },
    { id: 'customers', name: 'Customers', icon: <Users /> },
    { id: 'user-management', name: 'User Management', icon: <UserCog /> },
    { id: 'reports', name: 'Reports', icon: <BarChart2 /> },
    { id: 'manager-registration', name: 'Manager Registration', icon: <UserPlus /> },
    { id: 'inventory-manager', name: 'Inventory Manager', icon: <ClipboardList /> },
    { id: 'settings', name: 'Settings', icon: <Settings /> },
    { id: 'logout', name: 'Logout', icon: <LogOut /> }
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

  return (
    <>
      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        bg-gray-800 text-white w-64 h-screen overflow-y-auto z-30
        fixed lg:sticky top-0 left-0
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between py-6 px-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button 
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className="mt-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href="#"
                  className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 ease-in-out hover:bg-gray-700 ${
                    activeSection === item.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={handleNavClick(item.id)}
                  style={{textDecoration: "none"}}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;