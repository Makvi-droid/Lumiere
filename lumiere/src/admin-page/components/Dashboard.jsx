import React from 'react';
import { useOrder } from '../../add-to-cart/OrderContext';

const Dashboard = () => {
  const { orders, removeOrder } = useOrder();

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">Dashboard Overview</h3>
        <p className="text-gray-600 mb-6">Manage and track your orders</p>
        
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Total Orders</h4>
                <p className="text-gray-600">Lifetime orders placed</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{orders.length}</div>
          </div>
        </div>

        <h4 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h4>
        
        <div className="space-y-6 m-4 pt-9">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-xl font-semibold text-gray-800">Order #{order.id}</h5>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="mb-1 text-gray-600">
                      <span className="font-medium text-gray-800">Customer:</span> {order.user?.fullName || 'N/A'}
                    </p>
                    <p className="mb-1 text-gray-600">
                      <span className="font-medium text-gray-800">Contact:</span> {order.user?.contactNumber || 'N/A'}
                    </p>
                    <p className="mb-1 text-gray-600">
                      <span className="font-medium text-gray-800">Location:</span> {order.user?.location || 'N/A'}
                    </p>
                    <p className="mb-1 text-gray-600">
                      <span className="font-medium text-gray-800">Date:</span> {formatDate(order.date)}
                    </p>
                    <p className="mt-3 text-lg font-bold text-gray-800">
                      Total: ₱{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4">
                    <p className="font-medium text-gray-800 mb-2">Order Items ({order.totalItems})</p>
                    
                    <div className="flex flex-wrap gap-3">
                   
                      {order.items && order.items.map((item) => (
                        <div key={item.id} className="relative group">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-auto h-28 object-cover rounded-md shadow"
                          />
                           
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-md">
                            <div className="text-white text-xs font-medium text-center p-1">
                              {item.quantity} × ₱{item.price}
                            </div>
                            
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2">
                    View Details
                  </button>
                  <button
                    onClick={() => alert(`Tracking #: ${order.trackingNumber || 'N/A'}`)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    Track Order
                  </button>
                  <button
                    onClick={() => removeOrder(order.id)}
                    className="px-4 py-2 text-black rounded hover:bg-green-700 transition-colors"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 20V4" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You haven't placed any orders yet. Visit our shop to find beautiful items!
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Browse Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;