import React, { useState, useEffect } from 'react';
import { useOrder } from '../../add-to-cart/OrderContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ userId = null, limitDisplay = false }) => {
  const { orders, removeOrder, updateOrderStatus } = useOrder();
  const [displayOrders, setDisplayOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalOrderId, setModalOrderId] = useState(null); // Track which order has an open modal
  const [description, setDescription] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null); // Added missing state variable

  // Open report modal with the correct order
  const openReportModal = (order) => {
    setModalOrderId(order.id);
    setCurrentOrder(order);
    setModalOpen(true); // Set modal to open
  };
  
  // Close report modal and reset state
  const closeReportModal = () => {
    setModalOrderId(null);
    setCurrentOrder(null);
    setDescription('');
    setModalOpen(false); // Set modal to closed
  };

  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    processing: 0
  });
  const navigate = useNavigate();

  // Save orders to localStorage on change
  useEffect(() => {
    if (orders && orders.length > 0) {
      localStorage.setItem('dashboardOrders', JSON.stringify(orders));
    }
  }, [orders]);

  // Calculate order statistics and filter orders
  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      // First filter by user if a userId is provided
      let filteredOrders = orders;
      if (userId) {
        filteredOrders = orders.filter(order => order.user && order.user.id === userId);
      }
      
      // Calculate stats based on filtered orders
      const stats = {
        total: filteredOrders.length,
        pending: filteredOrders.filter(order => order.status === 'Pending').length,
        completed: filteredOrders.filter(order => order.status === 'Completed').length,
        processing: filteredOrders.filter(order =>
          ['Confirmed', 'Preparing', 'Ready for Pickup', 'Out for Meet-up'].includes(order.status)
        ).length
      };
      setOrderStats(stats);

      // Apply status filter
      if (statusFilter === 'All') {
        setDisplayOrders([...filteredOrders].sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else {
        setDisplayOrders(
          [...filteredOrders]
            .filter(order => order.status === statusFilter)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      }
      
      // Apply limit if needed
      if (limitDisplay && filteredOrders.length > 3) {
        setDisplayOrders(prev => prev.slice(0, 3));
      }
    } else {
      // If orders is undefined or not an array, set default values
      setOrderStats({
        total: 0,
        pending: 0,
        completed: 0,
        processing: 0
      });
      setDisplayOrders([]);
    }
  }, [orders, statusFilter, userId, limitDisplay]);

  // Format date to a more readable format
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

  // Get status badge style based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Preparing':
        return 'bg-purple-100 text-purple-800';
      case 'Ready for Pickup':
        return 'bg-indigo-100 text-indigo-800';
      case 'Out for Meet-up':
        return 'bg-pink-100 text-pink-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    if (updateOrderStatus) {
      updateOrderStatus(orderId, newStatus);
    }
  };

  // Handle order delivery (mark as completed)
  const markAsDelivered = (orderId) => {
    if (updateOrderStatus) {
      updateOrderStatus(orderId, 'Completed');
    }
  };


  // Helper function to safely format price
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0.00';
    if (typeof price === 'number') return price.toFixed(2);
    // If price is a string that can be converted to a number
    if (typeof price === 'string' && !isNaN(parseFloat(price))) {
      return parseFloat(price).toFixed(2);
    }
    return '0.00';
  };

  const handleModalSubmit = () => {
    if (currentOrder && description.trim()) {
      // Create a report object
      const report = {
        id: `report-${Date.now()}`,
        orderId: currentOrder.id,
        orderInfo: currentOrder,
        description: description,
        date: new Date().toISOString(),
        status: 'Pending Review'
      };
      
      // Get existing reports from localStorage
      const existingReports = JSON.parse(localStorage.getItem('orderReports') || '[]');
      
      // Add new report
      const updatedReports = [...existingReports, report];
      
      // Save to localStorage
      localStorage.setItem('orderReports', JSON.stringify(updatedReports));
      
      // Reset form and close modal
      closeReportModal();
      
      // Optional: Show success message
      alert('Report submitted successfully');
    }
  };

  return (
    <div className={`${limitDisplay ? 'p-4' : 'p-8'} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        {!limitDisplay && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:scale-[1.01]">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
              <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              {userId ? 'My Orders' : 'Dashboard Overview'}
            </h2>
            <p className="text-gray-600 mb-6 ml-12">
              {userId ? 'Track the status of your orders' : 'Monitor your business at a glance'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Total Orders</h4>
                      <p className="text-gray-600 text-sm">Lifetime</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{orderStats.total}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Pending</h4>
                      <p className="text-gray-600 text-sm">Awaiting action</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">{orderStats.pending}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-500 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Processing</h4>
                      <p className="text-gray-600 text-sm">In progress</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">{orderStats.processing}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-500 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Completed</h4>
                      <p className="text-gray-600 text-sm">Successfully delivered</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600">{orderStats.completed}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {userId ? 'My Orders' : 'Order Management'}
            </h3>
            <p className="text-gray-600">
              {userId ? 'View and track your orders' : 'Track and update your customer orders'}
            </p>
          </div>
          
          {!limitDisplay && (
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setStatusFilter('All')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'All' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Orders
              </button>
              <button 
                onClick={() => setStatusFilter('Pending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'Pending' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setStatusFilter('Completed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'Completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
              <button 
                onClick={() => setStatusFilter('Preparing')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'Preparing' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Preparing
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-8">
          {displayOrders && displayOrders.length > 0 ? (
            displayOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </span>
                      <h5 className="text-xl font-bold text-gray-800">Order #{order.id}</h5>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeClass(order.status || 'Completed')}`}>
                        {order.status || 'Completed'}
                      </span>
                      {!userId && (
                        <select
                          value={order.status || 'Completed'}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="border border-gray-300 rounded-lg py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Out for Meet-up">Out for Meet-up</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-medium text-gray-800">{order.user?.fullName || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium text-gray-800">{order.user?.contactNumber || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-800">{order.user?.location || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-800">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-blue-600 mr-2">₱{formatPrice(order.totalAmount)}</span>
                          <span className="text-gray-500">Total amount</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.totalItems || (order.items && order.items.length) || 0} items total
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                      <h6 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gray-100 p-1 rounded mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </span>
                        Order Items
                      </h6>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items && Array.isArray(order.items) ? (
                          order.items.map((item, index) => (
                            <div key={index} className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                              <div className="aspect-w-3 aspect-h-2">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-32 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="p-3">
                                <h6 className="font-medium text-gray-900 truncate">{item.name}</h6>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-gray-600 text-sm">{item.quantity}x</span>
                                  <span className="font-medium text-blue-600">₱{formatPrice(item.price)}</span>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                                <div className="p-3 w-full text-white text-center">
                                  <p className="text-sm font-medium">{item.quantity} × ₱{formatPrice(item.price)}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-4 text-gray-500">
                            No items found for this order
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  
                  
                  {!userId && (
                    <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                      {order.status !== 'Completed' && (
                        <button
                          onClick={() => markAsDelivered(order.id)}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Mark as Delivered
                        </button>
                      )}

                      {/* report issue button */}
                      {!userId && (
                        <button
                          onClick={() => openReportModal(order)}
                          className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 shadow-sm"
                        >
                          Report Issue
                        </button>
                      )}
                     
                      <button
                        onClick={() => {
                         if (removeOrder) {
                            removeOrder(order.id);
                          }
                        }}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  
                </div>
                
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Orders Found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {userId 
                  ? "You haven't placed any orders yet. Your order history will appear here after you make a purchase."
                  : statusFilter === 'All' 
                    ? "You don't have any orders yet. Orders will appear here once customers place them."
                    : `No orders with status "${statusFilter}" found. Try selecting a different status filter.`
                }
              </p>
              
            </div>
          )}
          
          {limitDisplay && displayOrders.length > 0 && (
            <div className="text-center mt-4">
              <a href="/my-orders" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                View all orders
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      
{/* Report Issue Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Report Issue with Order #{modalOrderId}</h3>
        <button 
          onClick={closeReportModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mb-4">
        <label htmlFor="reportDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Issue Description
        </label>
        <textarea
          id="reportDescription"
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Please describe the issue you're experiencing with this order..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      
      <div className="flex gap-3 justify-end">
        <button
          onClick={closeReportModal}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleModalSubmit}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          disabled={!description.trim()}
        >
          Submit Report
        </button>
      </div>
    </div>
  </div>
)}
      </div>
      
      </div>
    
  );
};

export default Dashboard;