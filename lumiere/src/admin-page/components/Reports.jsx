import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');

  // Load reports from localStorage
  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('orderReports') || '[]');
    setReports(savedReports);
  }, []);

  // Format date to readable format
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

  // Filter reports based on status
  const filteredReports = filter === 'All' 
    ? reports 
    : reports.filter(report => report.status === filter);

  // Get badge style based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Investigation':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status change of a report
  const updateReportStatus = (reportId, newStatus) => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        return { ...report, status: newStatus };
      }
      return report;
    });
    
    setReports(updatedReports);
    localStorage.setItem('orderReports', JSON.stringify(updatedReports));
  };

  // Handle admin response submission
  const handleResponseSubmit = () => {
    if (currentReport && adminResponse.trim()) {
      const updatedReports = reports.map(report => {
        if (report.id === currentReport.id) {
          return { 
            ...report, 
            adminResponse: adminResponse,
            status: 'Resolved',
            resolvedDate: new Date().toISOString()
          };
        }
        return report;
      });
      
      setReports(updatedReports);
      localStorage.setItem('orderReports', JSON.stringify(updatedReports));
      
      // Reset form
      setAdminResponse('');
      setCurrentReport(null);
      setModalOpen(false);
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

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
            <span className="bg-red-500 text-white p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            Product Issue Reports
          </h2>
          <p className="text-gray-600 mb-6 ml-12">
            Review and manage product reports with completed orders
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Total Reports</h4>
                    <p className="text-gray-600 text-sm">All time</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
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
                    <p className="text-gray-600 text-sm">Awaiting review</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-600">
                  {reports.filter(report => report.status === 'Pending Review').length}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Investigating</h4>
                    <p className="text-gray-600 text-sm">In progress</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {reports.filter(report => report.status === 'Under Investigation').length}
                </div>
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
                    <h4 className="text-xl font-semibold text-gray-800">Resolved</h4>
                    <p className="text-gray-600 text-sm">Issues fixed</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {reports.filter(report => report.status === 'Resolved').length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Issue Reports</h3>
            <p className="text-gray-600">Manage and respond to product reports</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('All')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Reports
            </button>
            <button 
              onClick={() => setFilter('Pending Review')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'Pending Review' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('Under Investigation')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'Under Investigation' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Investigating
            </button>
            <button 
              onClick={() => setFilter('Resolved')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'Resolved' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>
        
        {/* Reports List */}
        <div className="space-y-8">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <span className="bg-red-100 text-red-800 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <div>
                        <h5 className="text-xl font-bold text-gray-800">Report #{report.id.split('-')[1]}</h5>
                        <p className="text-sm text-gray-500">For Order #{report.orderId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                      </span>
                      <select
                        value={report.status}
                        onChange={(e) => updateReportStatus(report.id, e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Under Investigation">Under Investigation</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <div className="bg-red-50 p-4 rounded-lg mb-6">
                        <h6 className="font-semibold text-gray-800 mb-2">Product Report</h6>
                        <p className="text-gray-700">{report.description}</p>
                        <div className="mt-3 text-sm text-gray-500">
                          Reported on {formatDate(report.date)}
                        </div>
                      </div>
                      
                      {report.adminResponse && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h6 className="font-semibold text-gray-800 mb-2">Admin Response</h6>
                          <p className="text-gray-700">{report.adminResponse}</p>
                          <div className="mt-3 text-sm text-gray-500">
                            Resolved on {formatDate(report.resolvedDate)}
                          </div>
                        </div>
                      )}
                      
                      {!report.adminResponse && report.status !== 'Rejected' && (
                        <button
                          onClick={() => {
                            setCurrentReport(report);
                            setModalOpen(true);
                          }}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Respond to Issue
                        </button>
                      )}
                    </div>
                    
                    <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                      <h6 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gray-100 p-1 rounded mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        Order Details
                      </h6>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-gray-100 p-2 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Customer</p>
                            <p className="font-medium text-gray-800">
                              {report.orderInfo?.user?.fullName || 'N/A'}
                            </p>
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
                            <p className="font-medium text-gray-800">
                              {report.orderInfo?.user?.contactNumber || 'N/A'}
                            </p>
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
                            <p className="font-medium text-gray-800">
                              {report.orderInfo?.user?.location || 'N/A'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-gray-100 p-2 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-medium text-gray-800">
                              {formatDate(report.orderInfo?.date)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-blue-600 mr-2">
                              ₱{formatPrice(report.orderInfo?.totalAmount)}
                            </span>
                            <span className="text-gray-500">Total amount</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {report.orderInfo?.totalItems || 
                            (report.orderInfo?.items && report.orderInfo.items.length) || 0} items total
                          </p>
                        </div>
                      </div>
                      
                      {/* Order Items preview */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h6 className="font-semibold text-gray-800 mb-3">Order Items</h6>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                          {report.orderInfo?.items && Array.isArray(report.orderInfo.items) ? (
                            report.orderInfo.items.map((item, idx) => (
                              <div key={idx} className="flex items-center bg-gray-50 p-2 rounded-lg">
                                <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="ml-3 flex-grow">
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-gray-600 text-sm">{item.quantity}x</span>
                                    <span className="font-medium text-blue-600">₱{formatPrice(item.price)}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-3">No items found for this order</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Reports Found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {filter === 'All' 
                  ? "No order issue reports have been submitted yet. Customer reports will appear here when they're submitted."
                  : `No reports with status "${filter}" found. Try selecting a different status filter.`}
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                Browse Shop
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Admin Response */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Admin Response</h2>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Type your response here..."
              className="w-full border border-gray-300 rounded-lg p-2 h-24"
              required
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleResponseSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Response
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;