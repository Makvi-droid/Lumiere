import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Filter, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, ShoppingBag } from 'lucide-react';
import { useOrder } from '../../add-to-cart/OrderContext'; // Import the same context used in Orders.jsx

const Customers = () => {
  // Get the orders from the OrderContext
  const { orders } = useOrder();
  
  // Initial user data from SignUp.jsx
  const initialUsers = [
    { id: 1, username: "Sgt KatCat", password: "password123", role: "customer", email: "katcat@example.com", phone: "555-123-4567", joined: "2025-01-15", orders: 0, status: "Active" },
    { id: 2, username: "Biscoff", password: "password123", role: "customer", email: "biscoff@example.com", phone: "555-234-5678", joined: "2025-02-10", orders: 0, status: "Active" },
    { id: 3, username: "McJobilat", password: "password123", role: "customer", email: "mcjobilat@example.com", phone: "555-345-6789", joined: "2025-02-22", orders: 0, status: "Active" },
    { id: 4, username: "Gandalf", password: "password123", role: "customer", email: "gandalf@example.com", phone: "555-456-7890", joined: "2025-03-05", orders: 0, status: "Active" },
    { id: 5, username: "Ryan Reynolds", password: "password123", role: "customer", email: "reynolds@example.com", phone: "555-567-8901", joined: "2025-03-18", orders: 0, status: "Active" },
    { id: 6, username: "admin", password: "adminpass", role: "admin", email: "admin@example.com", phone: "555-987-6543", joined: "2025-01-01", orders: 0, status: "Active" }
  ];

  // State management
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerActivity, setCustomerActivity] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    id: 0,
    username: '',
    email: '',
    phone: '',
    joined: new Date().toISOString().split('T')[0],
    orders: 0,
    status: 'Pending',
    role: 'customer',
    password: ''
  });

  // Load customers and update order counts based on OrderContext
  useEffect(() => {
    // Filter to only show customers (not admins) on initial load
    const customerUsers = initialUsers.filter(user => user.role === 'customer');
    
    // Update customer order counts from the order context
    if (orders && orders.length > 0) {
      const updatedCustomers = customerUsers.map(customer => {
        // Count orders related to this customer
        const customerOrders = orders.filter(order => 
          order.user?.fullName?.toLowerCase() === customer.username.toLowerCase() ||
          order.user?.email === customer.email
        );
        
        // Update orders count based on actual orders
        return {
          ...customer,
          orders: customerOrders.length
        };
      });
      
      setCustomers(updatedCustomers);
    } else {
      setCustomers(customerUsers);
    }
  }, [orders]);

  // Track and update customer activity based on orders
  useEffect(() => {
    if (orders && orders.length > 0) {
      // Sort orders by date (newest first)
      const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Create activity entries from recent orders
      const recentActivity = sortedOrders.slice(0, 5).map(order => {
        const customer = customers.find(cust => 
          order.user?.fullName?.toLowerCase() === cust.username.toLowerCase() ||
          order.user?.email === cust.email
        );
        
        let activityText = 'Placed a new order';
        let timeAgo = getTimeAgo(new Date(order.date));
        
        if (order.status === 'Delivered' || order.status === 'Completed') {
          activityText = `Completed order #${order.id}`;
        } else if (order.status === 'Shipped') {
          activityText = `Order #${order.id} shipped`;
        } else if (order.status === 'Processing') {
          activityText = `Order #${order.id} is processing`;
        }
        
        return {
          username: customer?.username || order.user?.fullName || 'Unknown customer',
          time: timeAgo,
          action: activityText,
          details: `Total: ₱${order.totalAmount?.toFixed(2) || '0.00'} for ${order.totalItems || order.items?.length || 0} items`
        };
      });
      
      setCustomerActivity(recentActivity);
    }
  }, [orders, customers]);

  // Get relative time (e.g., "2 hours ago")
  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInDays)} days ago`;
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter customers based on search term and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Add new customer
  const handleAddCustomer = () => {
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const customerToAdd = {
      ...newCustomer,
      id: newId,
      password: 'defaultpassword123', // Default password
    };
    
    setCustomers([...customers, customerToAdd]);
    
    // Add to activity log
    setCustomerActivity([
      {
        username: customerToAdd.username,
        time: 'Just now',
        action: 'Account created',
        details: 'New customer registration'
      },
      ...customerActivity.slice(0, 4) // Keep only the 5 most recent activities
    ]);
    
    setNewCustomer({
      id: 0,
      username: '',
      email: '',
      phone: '',
      joined: new Date().toISOString().split('T')[0],
      orders: 0,
      status: 'Pending',
      role: 'customer',
      password: ''
    });
    setShowAddModal(false);
  };

  // Edit customer
  const handleEditCustomer = () => {
    const updatedCustomers = customers.map(customer => 
      customer.id === editingCustomer.id ? editingCustomer : customer
    );
    setCustomers(updatedCustomers);
    
    // Add to activity log
    setCustomerActivity([
      {
        username: editingCustomer.username,
        time: 'Just now',
        action: 'Profile updated',
        details: 'Customer information updated'
      },
      ...customerActivity.slice(0, 4) // Keep only the 5 most recent activities
    ]);
    
    setEditingCustomer(null);
  };

  // Delete customer
  const handleDeleteCustomer = (id) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      const customerToDelete = customers.find(c => c.id === id);
      setCustomers(customers.filter(customer => customer.id !== id));
      
      // Add to activity log
      if (customerToDelete) {
        setCustomerActivity([
          {
            username: customerToDelete.username,
            time: 'Just now',
            action: 'Account deleted',
            details: 'Customer removed from system'
          },
          ...customerActivity.slice(0, 4) // Keep only the 5 most recent activities
        ]);
      }
    }
  };

  // View customer orders
  const handleViewCustomerOrders = (customer) => {
    // Filter orders for the selected customer
    const customerOrders = orders?.filter(order => 
      order.user?.fullName?.toLowerCase() === customer.username.toLowerCase() ||
      order.user?.email === customer.email
    ) || [];
    
    if (customerOrders.length > 0) {
      alert(`${customer.username} has ${customerOrders.length} orders.`);
      // Here you could navigate to a dedicated view or open a modal with detailed order info
    } else {
      alert(`${customer.username} has no orders yet.`);
    }
  };

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Calculate status distribution
  const statusCounts = customers.reduce((acc, customer) => {
    acc[customer.status] = (acc[customer.status] || 0) + 1;
    return acc;
  }, {});

  const getStatusPercentage = (status) => {
    return customers.length > 0 
      ? ((statusCounts[status] || 0) / customers.length * 100).toFixed(1) + '%'
      : '0%';
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Customers</h3>
        <div className="mt-3 sm:mt-0 space-x-2 flex">
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)} 
            className="px-3 py-2 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 flex items-center gap-1"
          >
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
          >
            <PlusCircle size={16} /> Add Customer
          </button>
        </div>
      </div>

      {/* Filter Menu (conditionally rendered) */}
      {showFilterMenu && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h6 className="font-medium text-gray-700 mb-3">Filter by Status</h6>
          <div className="flex flex-wrap gap-2">
            {['All', 'Active', 'Inactive', 'Pending'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  filterStatus === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 sm:px-6 py-4 border-b">
          <h6 className="font-semibold text-blue-700 mb-3 md:mb-0">Customer Management</h6>
          <div className="flex items-center border rounded-md overflow-hidden w-full md:w-64">
            <input 
              type="text" 
              className="px-3 py-2 text-sm w-full outline-none"
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200">
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.length > 0 ? (
                currentCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{customer.id}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{customer.username || 'Anonymous'}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{customer.email}</td>
                    <td className="hidden md:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                    <td className="hidden lg:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.joined}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleViewCustomerOrders(customer)}
                        className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-1"
                      >
                        <ShoppingBag size={16} />
                        {customer.orders}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900" 
                          title="View" 
                          onClick={() => handleViewCustomerOrders(customer)}
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900" 
                          title="Edit"
                          onClick={() => setEditingCustomer({...customer})}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          title="Delete"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 sm:px-6 py-8 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white px-4 sm:px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-3 sm:mb-0">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} entries
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${
                currentPage === 1 
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Status Distribution and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b px-4 sm:px-6 py-4 font-semibold text-blue-700">Customer Status Distribution</div>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-green-700">Active</span>
                <span>{statusCounts.Active || 0} ({getStatusPercentage('Active')})</span>
              </div>
              <div className="w-full bg-green-100 h-3 rounded-full">
                <div 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{ width: getStatusPercentage('Active') }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-700">Inactive</span>
                <span>{statusCounts.Inactive || 0} ({getStatusPercentage('Inactive')})</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full">
                <div 
                  className="bg-gray-500 h-3 rounded-full" 
                  style={{ width: getStatusPercentage('Inactive') }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-yellow-700">Pending</span>
                <span>{statusCounts.Pending || 0} ({getStatusPercentage('Pending')})</span>
              </div>
              <div className="w-full bg-yellow-100 h-3 rounded-full">
                <div 
                  className="bg-yellow-500 h-3 rounded-full" 
                  style={{ width: getStatusPercentage('Pending') }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b px-4 sm:px-6 py-4 font-semibold text-blue-700">Recent Customer Activity</div>
          <div className="p-6 space-y-4">
            {customerActivity.length > 0 ? (
              customerActivity.map((activity, index) => (
                <div key={index} className={index < customerActivity.length - 1 ? "border-b pb-4" : ""}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-800">{activity.username}</span>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                  <p className="text-gray-600">{activity.action}</p>
                  {activity.details && (
                    <p className="text-gray-500 text-sm mt-1">{activity.details}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No recent activity to display</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Customer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCustomer.username}
                  onChange={(e) => setNewCustomer({...newCustomer, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddCustomer}
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Edit Customer Modal */}
       {editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Customer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingCustomer.username}
                  onChange={(e) => setEditingCustomer({...editingCustomer, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingCustomer.status}
                  onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orders</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingCustomer.orders}
                  onChange={(e) => setEditingCustomer({...editingCustomer, orders: parseInt(e.target.value) || 0})}
                  min="0"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setEditingCustomer(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleEditCustomer}
              >
                Update Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;