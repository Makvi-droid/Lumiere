import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './assets/profile.jpg';
import { motion } from 'framer-motion';
import { useOrder } from '../add-to-cart/OrderContext'; 
import DashBoard from '../admin-page/components/Dashboard'

function UserProfile() {
    const navigate = useNavigate();
    const { orders: allOrders } = useOrder(); // Get orders from context

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
        address: "Quezon, City",
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
        password: false
    });

    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        if (currentUser) {
            setUserData(prevData => ({
                ...prevData,
                name: currentUser.username,
                email: currentUser.email || prevData.email,
                phone: currentUser.contactNum,
            }));
        }

        // Filter orders for the current user
        const userOrders = allOrders.filter(order =>
            order.user?.id === currentUser.id || order.userId === currentUser.id
        );
        setOrders(userOrders);
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
        displayToast("Profile updated successfully");
        setIsModalOpen(prev => ({ ...prev, profile: false }));
    };

    const updatePassword = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            displayToast("Passwords do not match", 'error');
            return;
        }
        displayToast("Password updated successfully");
        setIsModalOpen(prev => ({ ...prev, password: false }));
    };


    const handleLogout = () => {
        setIsModalOpen(prevState => ({ ...prevState, logoutConfirmation: true })); // Open confirmation modal
    };

    const confirmLogout = () => {
        localStorage.removeItem('currentUser');
        displayToast("Logged out successfully");
        navigate('/');
    };

    const cancelLogout = () => {
        setIsModalOpen(prevState => ({ ...prevState, logoutConfirmation: false })); // Close confirmation modal
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

    const Modal = ({ isOpen, onClose, title, children, onSave, saveText = "Save Changes" }) => {
        if (!isOpen) return null;
        
        return (
            <div className="fixed inset-0 z-50 overflow-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-full"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        {title}
                                    </h3>
                                    <div className="mt-4 w-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button 
                                type="button" 
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={onSave}
                            >
                                {saveText}
                            </button>
                            <button 
                                type="button" 
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Toast Notification */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: toast.visible ? 1 : 0, y: toast.visible ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="fixed top-4 right-4 z-50"
                style={{ pointerEvents: toast.visible ? 'auto' : 'none' }}
            >
                {toast.visible && (
                   <div className={`rounded-md p-4 max-w-sm w-full shadow-lg ${toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}
                   style={{ opacity: toast.visible ? 1 : 0 }}>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {toast.type === 'success' ? (
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm font-medium ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                    {toast.message}
                                </p>
                            </div>
                            <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                    <button 
                                        onClick={() => setToast({...toast, visible: false})}
                                        className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${toast.type === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' : 'text-red-500 hover:bg-red-100 focus:ring-red-600'}`}
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L10 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isModalOpen.profile}
                onClose={() => setIsModalOpen(prevState => ({...prevState, profile: false}))}
                title="Edit Profile"
                onSave={saveProfile}
            >
                <form id="profileForm" className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={userData.name} 
                            onChange={handleProfileChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={userData.email} 
                            onChange={handleProfileChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="contactNum" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                            type="tel" 
                            id="contactNum" 
                            value={userData.contactNum} 
                            onChange={handleProfileChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                        <textarea 
                            id="address" 
                            rows="3" 
                            value={userData.address} 
                            onChange={handleProfileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                </form>
            </Modal>

            {/* Change Password Modal */}
            <Modal
                isOpen={isModalOpen.password}
                onClose={() => setIsModalOpen(prevState => ({...prevState, password: false}))}
                title="Change Password"
                onSave={updatePassword}
                saveText="Update Password"
            >
                <form id="passwordForm" className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input 
                            type="password" 
                            id="currentPassword" 
                            value={passwords.currentPassword} 
                            onChange={handlePasswordChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input 
                            type="password" 
                            id="newPassword" 
                            value={passwords.newPassword} 
                            onChange={handlePasswordChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            value={passwords.confirmPassword} 
                            onChange={handlePasswordChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </form>
            </Modal>

            {/* Main Content */}
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
                                    <h4 className="text-lg font-bold">My Account</h4>
                                </div>
                                <div className="p-0">
                                    <div className="text-center p-6 border-b border-gray-200">
                                        <div className="relative mx-auto mb-4 group">
                                            <img src={Profile} alt="Profile" className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md mx-auto transform group-hover:scale-105 transition-transform duration-300" />
                                            <button 
                                                onClick={() => setIsModalOpen(prevState => ({...prevState, profile: true}))}
                                                className="absolute bottom-0 right-1/4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-800">{userData.name}</h4>
                                        <p className="text-gray-500 mb-2">{userData.email}</p>
                                        {currentUser?.role && (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                {currentUser.role}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <button 
                                            className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activeTab === 'profile' ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                                            onClick={() => setActiveTab('profile')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </button>
                                        <button 
                                            className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activeTab === 'orders' ? 'text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                                            onClick={() => setActiveTab('orders')}
                                        >
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                My Orders
                                            </div>
                                            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {orders.length}
                                            </span>
                                        </button>
                                        <button 
                                            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                            onClick={() => setIsModalOpen(prevState => ({...prevState, password: true}))}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Change Password
                                        </button>
                                        <button 
                                            className="flex items-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                            onClick={handleLogout}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Logout Confirmation Modal */}
                        {isModalOpen.logoutConfirmation && (
                            <Modal
                                isOpen={isModalOpen.logoutConfirmation}
                                onClose={cancelLogout}
                                title="Confirm Logout"
                                onSave={confirmLogout}
                                saveText="Logout"
                            >
                                <p>Are you sure you want to log out?</p>
                            </Modal>
                        )}
                        
                        {/* Main Content */}
                        <div className="w-full md:w-2/3 lg:w-3/4">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-2xl shadow-xl h-full"
                                >
                                    <div className="px-6 py-5 border-b border-gray-200">
                                        <h5 className="text-lg font-bold text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Profile Information
                                        </h5>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-8">
                                            <div className="bg-gray-50 rounded-xl shadow-sm p-6 relative">
                                                <button 
                                                    className="absolute top-4 right-4 flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                                    onClick={() => setIsModalOpen(prevState => ({...prevState, profile: true}))}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <h5 className="text-gray-800 font-bold mb-4 pb-2 border-b border-gray-200">Personal Information</h5>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="text-gray-600 font-medium">Full Name:</div>
                                                        <div className="col-span-2 text-gray-800">{userData.name}</div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="text-gray-600 font-medium">Email:</div>
                                                        <div className="col-span-2 text-gray-800">{userData.email}</div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="text-gray-600 font-medium">Phone Number:</div>
                                                        <div className="col-span-2 text-gray-800">{userData.phone || 'Not provided'}</div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="text-gray-600 font-medium">Shipping Address:</div>
                                                        <div className="col-span-2 text-gray-800">{userData.address}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl shadow-sm p-6">
                                            <h5 className="text-gray-800 font-bold mb-4">Account Security</h5>
                                            <p className="mb-4">Protect your account with a strong password.</p>
                                            <button 
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                                onClick={() => setIsModalOpen(prevState => ({...prevState, password: true}))}
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                             
                            
                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-2xl shadow-xl h-full"
                                >
                                    <div className="px-6 py-5 border-b border-gray-200">
                                        <h5 className="text-lg font-bold text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            My Orders
                                        </h5>
                                    </div>
                                    <div className="p-6">
                                        {orders.length > 0 ? (
                                            orders.map((order) => (
                                                <div key={order.id} className="border-b border-gray-200 mb-4 pb-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h6 className="font-bold">Order #{order.id}</h6>
                                                            <p className="text-gray-500">{formatDate(order.date)}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}>
                                                            {order.status || 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <p className="text-gray-800 mb-2">Total: ₱{formatPrice(order.totalAmount)}</p>
                                                        <button 
                                                            onClick={() => removeOrder(order.id)} 
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Remove Order
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-5">
                                                <p className="text-gray-500">You haven't placed any orders yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;