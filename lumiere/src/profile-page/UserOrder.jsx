import React, { useState, useEffect } from 'react';
import { useOrder } from '../../add-to-cart/OrderContext';

const UserOrder = ({ userId, compact = false }) => {
  const { orders } = useOrder();
  const [userOrders, setUserOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('active');

  // Filter orders based on userId and active/completed status
  useEffect(() => {
    if (orders && userId) {
      const filteredOrders = orders.filter(order => order.user && order.user.id === userId);
      
      // Sort by date (newest first)
      filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setUserOrders(filteredOrders);
    }
  }, [orders, userId]);

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

  // Format price
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0.00';
    if (typeof price === 'number') return price.toFixed(2);
    if (typeof price === 'string' && !isNaN(parseFloat(price))) {
      return parseFloat(price).toFixed(2);
    }
    return '0.00';
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

  // Get active or completed orders
  const getFilteredOrders = () => {
    if (activeTab === 'active') {
      return userOrders.filter(order => order.status !== 'Completed');
    } else {
      return userOrders.filter(order => order.status === 'Completed');
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
      </div>

      {!compact && (
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 text-center py-3 px-4 font-medium text-sm ${
              activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Orders
          </button>
          <button
            className={`flex-1 text-center py-3 px-4 font-medium text-sm ${
              activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Orders
          </button>
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </span>
                  <div>
                    <span className="text-sm text-gray-500">Order ID</span>
                    <h5 className="font-medium text-gray-900">#{order.id}</h5>
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status || 'Completed')}`}>
                    {order.status || 'Completed'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {order.items && Array.isArray(order.items) && order.items.slice(0, compact ? 2 : 3).map((item, index) => (
                  <div key={index} className="flex items-center bg-gray-50 rounded-md p-2 flex-grow max-w-full sm:max-w-[calc(50%-0.5rem)]">
                    <div className="w-10 h-10 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-2 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity}x · ₱{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
                {order.items && order.items.length > (compact ? 2 : 3) && (
                  <div className="flex items-center justify-center bg-gray-50 rounded-md p-2 flex-grow max-w-full sm:max-w-[calc(50%-0.5rem)]">
                    <span className="text-sm text-gray-500">+{order.items.length - (compact ? 2 : 3)} more items</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(order.date)}
                </div>
                <div className="font-medium text-blue-600">
                  ₱{formatPrice(order.totalAmount)}
                </div>
              </div>

              {!compact && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {order.totalItems || (order.items && order.items.length) || 0} items total
                  </span>
                  <a href={`/order/${order.id}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-600 max-w-xs mx-auto text-sm">
              {activeTab === 'active' 
                ? "You don't have any active orders at the moment."
                : "You don't have any completed orders yet."
              }
            </p>
          </div>
        )}
      </div>

      {compact && userOrders.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
          <a href="/my-orders" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all orders
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default UserOrder;