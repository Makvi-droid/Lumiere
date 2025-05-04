import React, { useState, useEffect } from 'react';
import { products as initialProducts } from '../../products-page/assets/assets';

const Products = () => {
  const [productsData, setProductsData] = useState(() => {
    // Try to get products from local storage or use initialProducts as fallback
    const savedProducts = localStorage.getItem('productsData');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  // Save the productsData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productsData', JSON.stringify(productsData));
  }, [productsData]);

  // Get status styles for the status badge
  const getStatusStyles = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Count products based on their stock status
  const statusCounts = {
    'In Stock': productsData.filter(p => p.status === 'In Stock').length,
    'Low Stock': productsData.filter(p => p.status === 'Low Stock').length,
    'Out of Stock': productsData.filter(p => p.status === 'Out of Stock').length,
  };

  // Handle deleting a product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductsData(prev => prev.filter(p => p.id !== id));
    }
  };

  // Handle editing a product
  const handleEdit = (product) => {
    const updatedName = prompt("Edit product name:", product.name);
    if (updatedName !== null && updatedName.trim() !== '') {
      setProductsData(prev =>
        prev.map(p => (p.id === product.id ? { ...p, name: updatedName } : p))
      );
    }
  };

  // Handle updating stock for a product
  const handleStockUpdate = (id, newStock) => {
    setProductsData(prev =>
      prev.map(p => 
        p.id === id ? { ...p, stock: newStock, status: newStock > 10 ? 'In Stock' : newStock > 0 ? 'Low Stock' : 'Out of Stock' } : p
      )
    );
  };

  // Increase or decrease stock
  const handleStockChange = (id, change) => {
    const product = productsData.find(p => p.id === id);
    const newStock = product.stock + change;
    handleStockUpdate(id, Math.max(newStock, 0)); // Ensure stock doesn't go below 0
  };

  return (
    <div className="px-4 py-6 max-w-full mx-auto">
      {/* Stock Tracker Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-md shadow">
          <h3 className="font-bold">In Stock</h3>
          <p>{statusCounts['In Stock']}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
          <h3 className="font-bold">Low Stock</h3>
          <p>{statusCounts['Low Stock']}</p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-md shadow">
          <h3 className="font-bold">Out of Stock</h3>
          <p>{statusCounts['Out of Stock']}</p>
        </div>
      </div>

      {/* Header and Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Product Management</h2>
        <div className="relative w-64">
         
           
         
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsData
                .filter(product =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md bg-gray-200 object-cover" />
                        <div className="ml-4 text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleStockChange(product.id, -1)}
                          className="px-2 py-1 bg-red-500 text-white rounded-full"
                          disabled={product.stock <= 0}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
                          className="w-20 p-1 border border-gray-300 rounded mx-2"
                        />
                        <button
                          onClick={() => handleStockChange(product.id, 1)}
                          className="px-2 py-1 bg-green-500 text-white rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusStyles(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm space-x-4 justify-between gap-6 p-7"> {/* Reduced space-x-7 and gap-7 to space-x-4 and gap-4 */}
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                          onClick={() => setViewProduct(product)}
                        >
                          <i className="fas fa-eye text-2xl mr-2"></i>
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                          onClick={() => handleEdit(product)}
                        >
                          <i className="fas fa-edit text-2xl mr-2"></i>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <i className="fas fa-trash-alt text-2xl"></i>
                        </button>
                      </td>


                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <img src={viewProduct.image} alt={viewProduct.name} className="w-20 h-20 object-cover rounded mb-2" />
            <p><strong>Name:</strong> {viewProduct.name}</p>
            <p><strong>Category:</strong> {viewProduct.category}</p>
            <p><strong>Price:</strong> ${viewProduct.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {viewProduct.stock}</p>
            <p><strong>Status:</strong> {viewProduct.status}</p>
            <button
              onClick={() => setViewProduct(null)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
