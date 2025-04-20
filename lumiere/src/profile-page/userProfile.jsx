import React, { useState } from 'react';
import './userProfile.css';

function UserProfile() {
    const [userData, setUserData] = useState({
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "+639876543210",
        address: "Quezon, City",
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [orders, setOrders] = useState([
        {
            id: 1,
            item: "Crochet Blanket",
            date: "2025-04-01",
            status: "Shipped"
        },
        {
            id: 2,
            item: "Crochet Hat",
            date: "2025-03-15",
            status: "Delivered"
        },
        {
            id: 3,
            item: "Crochet Scarf",
            date: "2025-02-28",
            status: "Pending"
        }
    ]);

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
            <div className="toast-container">
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
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="name" value={userData.name} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className="form-control" id="email" value={userData.email} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="phone" value={userData.phone} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                    <input type="password" className="form-control" id="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <input type="password" className="form-control" id="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
                                </div>
                                <div className="form-group">
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
                            <div className="profile-card">
                                <img src="https://i.pinimg.com/originals/f5/8a/ac/f58aacd2cddf1a32e2701ba767184f3c.jpg" alt="Profile Image" className="profile-img" id="profileImage" />
                                <h3 className="profile-name" id="userName">{userData.name}</h3>
                                <p className="profile-email" id="userEmail">{userData.email}</p>

                                <div className="profile-stats">
                                    <div>
                                        <div className="stat-number">3</div>
                                        <div className="stat-label">Orders</div>
                                    </div>
                                    <div>
                                        <div className="stat-number">0</div>
                                        <div className="stat-label">Wishlist</div>
                                    </div>
                                    <div>
                                        <div className="stat-number">1</div>
                                        <div className="stat-label">Pending</div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
                                    <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</button>
                                    <button className="btn btn-outline-danger">Logout</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <h2 className="section-title">Your Orders</h2>
                            <div className="order-list">
                                {orders.length === 0 ? (
                                    <p>No orders yet.</p>
                                ) : (
                                    orders.map(order => (
                                        <div key={order.id} className="order-item">
                                            <div className="order-item-details">
                                                <h5>{order.item}</h5>
                                                <p>Date: {order.date}</p>
                                                <p>Status: <strong>{order.status}</strong></p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserProfile;
