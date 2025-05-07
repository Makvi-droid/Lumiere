import React, { useState, useEffect } from 'react';
import { useOrder } from '../add-to-cart/OrderContext';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../admin-page/components/Dashboard';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Animation states
  const [animateProfile, setAnimateProfile] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimateProfile(true);
    
    // Get user data from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        fullName: parsedUser.username || '',
        email: parsedUser.email || '',
        contactNumber: parsedUser.contactNum || '',
        location: parsedUser.location || '',
        password: '',
        confirmPassword: '',
      });
    } else {
      // Redirect to login if no user is found
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data if cancelling edit
      setFormData({
        fullName: user?.fullName || '',
        email: user?.email || '',
        contactNumber: user?.contactNumber || '',
        location: user?.location || '',
        password: '',
        confirmPassword: '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match if changing password
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Update user object
    const updatedUser = {
      ...user,
      fullName: formData.fullName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      location: formData.location,
    };

    // If password is provided, update it
    if (formData.password) {
      updatedUser.password = formData.password;
    }

    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update users array in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update state
    setUser(updatedUser);
    setIsEditing(false);

    // Show success message
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem('currentUser');
    
    // Redirect to login page
    navigate('/');
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 ease-in-out ${animateProfile ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Header Section with User Cover */}
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-600">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-6 flex items-center">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-blue-300 to-indigo-400 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
            <div className="ml-4 text-white">
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="opacity-90">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="px-6 -mb-px flex space-x-8">
            <button
              onClick={() => switchTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => switchTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Order History
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            <div className="transition-all duration-300 ease-in-out">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={toggleEditMode}
                    className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                      isEditing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profile
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-sm text-red-600 mt-1">Passwords don't match</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700  flex items-center gap-2 shadow-md transform hover:scale-105 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Order History</h3>
              <Dashboard userId={user.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;