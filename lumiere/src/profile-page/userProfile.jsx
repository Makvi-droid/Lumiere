import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './assets/profile.jpg';
import { motion } from 'framer-motion';
import { useOrder } from '../add-to-cart/OrderContext';
import Dashboard from '../admin-page/components/Dashboard';

function UserProfile() {
    const navigate = useNavigate();
    const { orders: allOrders, removeOrder } = useOrder(); // Make sure to get removeOrder from context

    
    
    const getCurrentUser = () => {
        try {
            const userJson = localStorage.getItem('currentUser');
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            console.error("Error parsing currentUser from localStorage:", error);
            return null;
        }
    };

    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
    const [userData, setUserData] = useState({
        name: currentUser?.username || "Guest",
        phone: currentUser?.contactNum || '',
        address: currentUser?.address || '',
        email: currentUser?.email || ""
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');
    const [isModalOpen, setIsModalOpen] = useState({
        profile: false,
        password: false,
        logoutConfirmation: false
    });

    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        if (currentUser && Array.isArray(allOrders)) {
            setUserData(prevData => ({
                ...prevData,
                name: currentUser.username,
                email: currentUser.email || prevData.email,
                phone: currentUser.contactNum,
                address: currentUser.address || prevData.address,
            }));
    
            const userOrders = allOrders.filter(order =>
                order.user?.id === currentUser.id || order.id === currentUser.id
            );
            setOrders(userOrders);
        }
    }, [currentUser, allOrders]);
    
    const handleProfileChange = (e) => {
        const { id, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const saveProfile = () => {
        // Update user data in localStorage
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                username: userData.name,
                email: userData.email,
                contactNum: userData.phone,
                address: userData.address
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
        }
        
        displayToast("Profile updated successfully");
        setIsModalOpen(prev => ({ ...prev, profile: false }));
    };

    const updatePassword = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            displayToast("Passwords do not match", 'error');
            return;
        }
        
        // In a real app, you would validate current password and update it
        // For this example, we'll just show a success message
        displayToast("Password updated successfully");
        setIsModalOpen(prev => ({ ...prev, password: false }));
    };

    const handleLogout = () => {
        setIsModalOpen(prevState => ({ ...prevState, logoutConfirmation: true }));
    };

    const confirmLogout = () => {
        localStorage.removeItem('currentUser');
        displayToast("Logged out successfully");
        navigate('/');
    };

    const cancelLogout = () => {
        setIsModalOpen(prevState => ({ ...prevState, logoutConfirmation: false }));
    };

    const displayToast = (message, type = 'success') => {
        setToast({
            visible: true,
            message,
            type
        });

        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-200 text-yellow-800';
            case 'Confirmed':
                return 'bg-blue-200 text-blue-800';
            case 'Preparing':
                return 'bg-indigo-500 text-white';
            case 'Ready for Pickup':
                return 'bg-purple-500 text-white';
            case 'Out for Meet-up':
                return 'bg-pink-500 text-white';
            case 'Completed':
                return 'bg-green-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const formatPrice = (price) => {
        if (price === undefined || price === null) return '0.00';
        if (typeof price === 'number') return price.toFixed(2);
        if (typeof price === 'string' && !isNaN(parseFloat(price))) {
            return parseFloat(price).toFixed(2);
        }
        return '0.00';
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-16">
            {/* Toast Notification */}
            {toast.visible && (
                <div className={`fixed top-20 right-5 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out ${
                    toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                    {toast.message}
                </div>
            )}
            
            {/* Logout Confirmation Modal */}
            {isModalOpen.logoutConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
                        <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
                        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={cancelLogout}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="container mx-auto px-4 py-8 mt-7">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Side - Profile Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                                    <img src={Profile} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{userData.name}</h3>
                                <p className="text-gray-500">{userData.email}</p>
                            </div>
                            
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                                        activeTab === 'profile' 
                                            ? 'bg-indigo-50 text-indigo-700' 
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    My Profile
                                </button>
                                
                                <button 
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                                        activeTab === 'orders' 
                                            ? 'bg-indigo-50 text-indigo-700' 
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    My Orders
                                </button>
                                
                                <button 
                                    onClick={() => setActiveTab('password')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                                        activeTab === 'password' 
                                            ? 'bg-indigo-50 text-indigo-700' 
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                    Change Password
                                </button>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Content Area */}
                    <div className="w-full md:w-3/4">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-xl"
                            >
                                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                    <h5 className="text-lg font-bold text-gray-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Profile
                                    </h5>
                                    <button 
                                        onClick={() => setIsModalOpen(prev => ({ ...prev, profile: true }))}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit Profile
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                            <p className="font-medium text-gray-800">{userData.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                            <p className="font-medium text-gray-800">{userData.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                            <p className="font-medium text-gray-800">{userData.phone || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Address</p>
                                            <p className="font-medium text-gray-800">{userData.address || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Edit Profile Modal */}
                                {isModalOpen.profile && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-bold">Edit Profile</h3>
                                                <button 
                                                    onClick={() => setIsModalOpen(prev => ({ ...prev, profile: false }))}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Full Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="name" 
                                                        value={userData.name} 
                                                        onChange={handleProfileChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email Address
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        id="email" 
                                                        value={userData.email} 
                                                        onChange={handleProfileChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Phone Number
                                                    </label>
                                                    <input 
                                                        type="tel" 
                                                        id="phone" 
                                                        value={userData.phone} 
                                                        onChange={handleProfileChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Address
                                                    </label>
                                                    <textarea 
                                                        id="address" 
                                                        value={userData.address} 
                                                        onChange={handleProfileChange}
                                                        rows="3"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <button 
                                                    onClick={() => setIsModalOpen(prev => ({ ...prev, profile: false }))}
                                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors mr-3"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={saveProfile}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-xl"
                            >
                                {/* Use Dashboard component to display user orders */}
                                <Dashboard userId={currentUser?.userId} />
                            </motion.div>
                        )}
                        
                        {/* Password Tab */}
                        {activeTab === 'password' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-xl"
                            >
                                <div className="px-6 py-5 border-b border-gray-200">
                                    <h5 className="text-lg font-bold text-gray-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                        </svg>
                                        Change Password
                                    </h5>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password
                                            </label>
                                            <input 
                                                type="password" 
                                                id="currentPassword" 
                                                value={passwords.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password
                                            </label>
                                            <input 
                                                type="password" 
                                                id="newPassword" 
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm New Password
                                            </label>
                                            <input 
                                                type="password" 
                                                id="confirmPassword" 
                                                value={passwords.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button 
                                            onClick={updatePassword}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;