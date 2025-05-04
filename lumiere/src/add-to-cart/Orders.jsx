import { useCart } from '../profile-page/cartContext';
import React, { useState, useEffect } from 'react';
import { useOrder } from './OrderContext';

function Orders() {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const { addOrder } = useOrder();
    
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
        phone: currentUser?.contactNum || "+639876543210",
        address: currentUser?.address || "Quezon City",
    });

    // Checkout form state
    const [checkoutData, setCheckoutData] = useState({
        fullName: currentUser?.username || "",
        contactNumber: userData.phone || "",
        location: "Quezon City"
    });

    // Available locations for dropdown
    const locations = [
        "Quezon City",
        "Manila",
        "Makati",
        "Taguig",
        "Pasig",
        "Mandaluyong",
        "Pasay",
        "Parañaque",
        "Caloocan",
        "Marikina"
    ];
   
    // Update userData when currentUser changes
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUserData(prevData => ({
                ...prevData,
                name: user.username,
                email: user.email || prevData.email,
            }));
            
            setCheckoutData(prevData => ({
                ...prevData,
                fullName: user.username || "",
            }));
        }
    }, []);

    const handleCheckoutChange = (e) => {
        const { id, value } = e.target;
        setCheckoutData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) newQuantity = 1;
        updateQuantity(id, parseInt(newQuantity));
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
        displayToast("Item removed from cart");
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            displayToast("Your cart is empty", "error");
            return;
        }
        
        // Show the checkout modal
        const checkoutModal = new window.bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
    };

    const processCheckout = () => {
        if (!checkoutData.fullName || !checkoutData.contactNumber || !checkoutData.location) {
            displayToast("Please fill all checkout fields", "error");
            return;
        }
    
        const newOrder = {
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image, // Store the image URL
                totalPrice: item.price * item.quantity
            })),
            totalAmount: getTotalPrice(),
            totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            user: {
                fullName: checkoutData.fullName,
                contactNumber: checkoutData.contactNumber,
                location: checkoutData.location,
            },
            date: new Date().toISOString(),
        };
    
        // Add the order and get the order ID
        const orderId = addOrder(newOrder);
    
        // Close the modal
        const checkoutModalElement = document.getElementById('checkoutModal');
        const checkoutModal = window.bootstrap.Modal.getInstance(checkoutModalElement);
        checkoutModal.hide();
    
        displayToast(`Order #${orderId} placed successfully!`);
        clearCart();
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

    return(
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

            {/* Checkout Modal */}
            <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Complete Your Order</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="checkoutForm">
                                <div className="form-group mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fullName" 
                                        value={checkoutData.fullName} 
                                        onChange={handleCheckoutChange}
                                        placeholder="Enter your full name" 
                                        required 
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                    <input 
                                        type="tel" 
                                        className="form-control" 
                                        id="contactNumber" 
                                        value={checkoutData.contactNumber} 
                                        onChange={handleCheckoutChange}
                                        placeholder="+63 XXX XXX XXXX" 
                                        required 
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="location" className="form-label">Delivery Location</label>
                                    <select 
                                        className="form-select" 
                                        id="location" 
                                        value={checkoutData.location} 
                                        onChange={handleCheckoutChange}
                                        required
                                    >
                                        {locations.map((location, index) => (
                                            <option key={index} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <h6>Order Summary</h6>
                                    <div className="d-flex justify-content-between">
                                        <span>Total Items:</span>
                                        <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between fw-bold">
                                        <span>Total Amount:</span>
                                        <span>₱{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={processCheckout}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shopping Cart */}
            <div className="p-3">
                <h5 className="mb-3">Your Shopping Cart</h5>

                {cartItems.length === 0 ? (
                    <div className="alert alert-info mb-0">
                        <div className="text-center py-4">
                            <i className="bi bi-cart3 fs-1"></i>
                            <h5 className="mt-3">Your shopping cart is empty</h5>
                            <p className="text-muted">Browse our collection and add some beautiful items!</p>
                        </div>
                    </div>
                ) : (
                    <div className="container px-0">
                        {cartItems.map(item => (
                            <div key={item.id} className="mb-3 border rounded shadow-sm p-3">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-3">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="img-fluid rounded"
                                            style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-4 col-9">
                                        <h5 className="cart-item-title">{item.name}</h5>
                                        <p className="cart-item-price mb-0 fw-bold">₱{item.price}</p>
                                    </div>
                                    <div className="col-md-3 col-6 mt-md-0 mt-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button 
                                                className="btn btn-outline-secondary px-2" 
                                                type="button"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >−</button>

                                            <input 
                                                type="number" 
                                                className="form-control mx-2 text-center"
                                                style={{ maxWidth: "60px" }}
                                                value={item.quantity} 
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                                min="1"
                                            />

                                            <button 
                                                className="btn btn-outline-secondary px-2" 
                                                type="button"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="col-md-2 col-6 text-md-center mt-md-0 mt-3">
                                        <p className="item-total mb-0 fw-bold">₱{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="col-md-1 col-12 text-md-end mt-md-0 mt-3">
                                        <button 
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="cart-summary p-3 bg-light rounded mt-4">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h5 className="mb-0">
                                        Total Items: <span className="badge bg-primary">
                                            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    </h5>
                                </div>
                                <div className="col-md-6 text-md-end mt-md-0 mt-3">
                                    <h5 className="mb-3">
                                        Total: <span className="fw-bold">
                                            ₱{getTotalPrice().toFixed(2)}
                                        </span>
                                    </h5>
                                    <div className="btn-group">
                                        <button className="btn btn-outline-secondary" onClick={clearCart}>Clear Cart</button>
                                        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Orders;