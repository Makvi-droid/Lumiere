import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Profile from './assets/profile.jpg'


function UserProfile() {
    
    const navigate = useNavigate(); // Initialize navigate function
    
    // Get current user from localStorage
    const getCurrentUser = () => {
        try {
            const userJson = localStorage.getItem('currentUser');
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            console.error("Error parsing currentUser from localStorage:", error);
            return null;
        }
    };
    
    const currentUser = getCurrentUser();
    
    // Use currentUser data if available, otherwise use default values
    const [userData, setUserData] = useState({
        name: currentUser?.username || "Guest",
        phone: "+639876543210",
        address: "Quezon, City",
    });


    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Update userData when currentUser changes
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUserData(prevData => ({
                ...prevData,
                name: user.username,
                email: user.email || prevData.email,
            }));
            
           
        }
    }, []);
    
    const handleProfileChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswords((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    

    const saveProfile = () => {
        // Save profile changes (simulated here)
        displayToast("Profile updated successfully");
    };

    const updatePassword = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            displayToast("Passwords do not match", 'error');
            return;
        }
        // Save password changes (simulated here)
        displayToast("Password updated successfully");
    };

   

    

    

    // Logout function
    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('currentUser');
                
        // Show notification
        displayToast("Logged out successfully");
        
        // Navigate to the guest page 
        setTimeout(() => {
            navigate('/'); 
        }); 
    };

    const displayToast = (message, type = 'success') => {
        const toast = document.getElementById('notificationToast');
        const toastMessage = document.getElementById('toastMessage');
        const toastTitle = document.getElementById('toastTitle');

        toastTitle.textContent = type === 'success' ? "Notification" : "Error";
        toastMessage.textContent = message;

        const toastElement = new window.bootstrap.Toast(toast);
        toastElement.show();
    };

    return (
        <>
            {/* Toast Notification */}
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div id="notificationToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto" id="toastTitle">Notification</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body" id="toastMessage">
                        Action completed successfully.
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="profileForm">
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="name" value={userData.name} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className="form-control" id="email" value={userData.email} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="phone" value={userData.phone} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="address" className="form-label">Shipping Address</label>
                                    <textarea className="form-control" id="address" rows="3" value={userData.address} onChange={handleProfileChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="passwordForm">
                                <div className="form-group mb-3">
                                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                    <input type="password" className="form-control" id="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <input type="password" className="form-control" id="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={updatePassword}>Update Password</button>
                        </div>
                    </div>
                </div>
            </div>

        

            {/* Profile and Order Information */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="profile-card shadow rounded">
                                <div className="profile-header bg-primary text-white p-3 rounded-top">
                                    <h4 className="mb-0">My Profile</h4>
                                </div>
                                <div className="profile-body p-4 text-center">
                                <div className="profile-img-container mb-3">
                                        <img src={Profile} alt="Profile Image" className="profile-img" id="profileImage" />
                                    </div>
                                    <h3 className="profile-name" id="userName">{userData.name}</h3>
                                    <p className="profile-email text-muted" id="userEmail">{userData.email}</p>
                                    {currentUser?.role && (
                                        <span className="badge bg-info text-dark mb-2">{currentUser.role}</span>
                                    )}
                                   

                                    <div className="d-grid gap-2 mt-4">
                                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
                                        
                                        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                </div>                       
            </div>         
        </section>            
    </>
    );
}

export default UserProfile;