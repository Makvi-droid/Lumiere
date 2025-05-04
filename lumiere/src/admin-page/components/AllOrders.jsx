// AllOrders.jsx
import React from 'react';
import { useOrder } from '../../add-to-cart/OrderContext';

const AllOrders = ({ onClose }) => {
  const { orders } = useOrder();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h3 className="text-xl font-semibold mb-4">All Orders</h3>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.user?.fullName || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(order.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₱{order.totalAmount?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No orders found.</div>
        )}
        <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AllOrders;