import React, { useState, useEffect } from 'react';
import { useOrder } from '../../add-to-cart/OrderContext';

const Orders = () => {
  const { orders, removeOrder, updateOrderStatus } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (orders) {
      applyFilters();
    }
  }, [orders, searchTerm, selectedFilter]);

  const applyFilters = () => {
    let filtered = [...orders];

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toString().includes(searchTerm) ||
        (order.user?.fullName && order.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.totalAmount && order.totalAmount.toString().includes(searchTerm))
      );
    }

    if (selectedFilter !== 'All') {
      filtered = filtered.filter(order => order.status === selectedFilter);
    }

    setFilteredOrders(filtered);
  };

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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-gray-500 text-white';
      case 'Confirmed':
        return 'bg-blue-500 text-white';
      case 'Preparing':
        return 'bg-yellow-500 text-black';
      case 'Ready for Pickup':
        return 'bg-green-500 text-white';
      case 'Out for Meet-up':
        return 'bg-indigo-500 text-white';
      case 'Completed':
        return 'bg-green-600 text-white';
      default:
        return 'bg-indigo-500 text-white';
    }
  };

  const handleEdit = (orderId) => {
    setEditingOrderId(orderId);
    const order = orders.find(order => order.id === orderId);
    setNewStatus(order.status);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveStatus = (orderId) => {
    updateOrderStatus(orderId, newStatus);
    setEditingOrderId(null);
    setNewStatus('');
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setNewStatus('');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h3 className="text-3xl font-bold text-gray-800">Orders</h3>
            <p className="text-gray-600">Manage your customer orders</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <div className="relative">
              <select
                className="border border-gray-300 rounded-lg py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Out for Meet-up">Out for Meet-up</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h6 className="text-lg font-semibold text-blue-600">Order Management</h6>
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-64 border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {orders && orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.user?.fullName || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{order.user?.location || 'No location'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.user?.contactNumber || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(order.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status || 'Completed')}`}>
                          {order.status || 'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.totalItems || order.items?.length || 0} items</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₱{order.totalAmount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex justify-start gap-4"> {/* Add flex container with gap */}
                          <button
                            onClick={() => handleEdit(order.id)}
                            className="text-blue-600 hover:text-blue-800"
                            disabled={editingOrderId === order.id}
                          >
                            Edit Status
                          </button>
                          <button
                            onClick={() => removeOrder(order.id)}
                            className="text-red-600 hover:text-red-800"
                            disabled={editingOrderId === order.id}
                          >
                            Remove
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-4 text-gray-500">No orders found.</div>
          )}
        </div>
      </div>

      {editingOrderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Order Status</h3>
            <select
              value={newStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-lg p-2 mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Out for Meet-up">Out for Meet-up</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-700 p-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveStatus(editingOrderId)}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
