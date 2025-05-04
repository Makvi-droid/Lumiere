import React, { useState, useEffect } from 'react';
import Sidebar from './components/SideBar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Products from './components/Products';
import { OrderProvider } from '../add-to-cart/OrderContext';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <details className="whitespace-pre-wrap text-sm text-red-600 mt-2">
            <summary>Show error details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p className="mt-2">Component Stack:</p>
            <pre className="mt-1 bg-red-100 p-2 rounded overflow-auto max-h-60">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open on desktop
  const [profileData, setProfileData] = useState({ username: '', email: '' });

  // Load profile from localStorage on mount
  useEffect(() => {
    const username = localStorage.getItem('adminUsername') || '';
    const email = localStorage.getItem('adminEmail') || '';
    setProfileData({ username, email });
    
    // Close sidebar by default on mobile
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle section navigation
  const handleNavigation = (section) => {
    if (section === 'logout') {
      handleLogout();
      return;
    }
    setActiveSection(section);
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      alert('Logged out.');
      window.location.reload();
    }
  };

  // Render active component based on selected section
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        );
      case 'orders':
        return (
          <ErrorBoundary>
            <Orders />
          </ErrorBoundary>
        );
      case 'customers':
        return (
          <ErrorBoundary>
            <Customers />
          </ErrorBoundary>
        );
      case 'products':
        return (
          <ErrorBoundary>
            <Products />
          </ErrorBoundary>
        );
      default:
        return (
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        );
    }
  };

  return (
    <OrderProvider>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar Component */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigation}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar Component */}
          <Navbar
            username={profileData.username}
            onLogout={handleLogout}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* Content Area */}
          <div className="flex-1 p-4 md:p-6">
            <div className="max-w-screen-xl mx-auto">
              {renderActiveComponent()}
            </div>
          </div>
        </div>
      </div>
    </OrderProvider>
  );
};

export default AdminPage;