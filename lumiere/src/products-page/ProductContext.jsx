import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from './assets/assets'; // Fixed import path

// Create Context
export const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
  const [productsData, setProductsData] = useState(() => {
    // Try to get products from local storage or use initialProducts as fallback
    const savedProducts = localStorage.getItem('productsData');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Save the productsData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productsData', JSON.stringify(productsData));
  }, [productsData]);

  // Update stock when an order is placed
  const updateStockOnOrder = (productId, quantity = 1) => {
    setProductsData(prev => 
      prev.map(product => {
        if (product.id === productId) {
          const newStock = Math.max(0, product.stock - quantity);
          return {
            ...product,
            stock: newStock,
            status: newStock > 10 ? 'In Stock' : newStock > 0 ? 'Low Stock' : 'Out of Stock'
          };
        }
        return product;
      })
    );
  };

  // Update stock directly
  const updateProductStock = (id, newStock) => {
    setProductsData(prev =>
      prev.map(p => 
        p.id === id ? { 
          ...p, 
          stock: newStock, 
          status: newStock > 10 ? 'In Stock' : newStock > 0 ? 'Low Stock' : 'Out of Stock' 
        } : p
      )
    );
  };

  // Handle stock change (increase or decrease)
  const handleStockChange = (id, change) => {
    const product = productsData.find(p => p.id === id);
    if (product) {
      const newStock = Math.max(0, product.stock + change);
      updateProductStock(id, newStock);
    }
  };

  // Delete a product
  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductsData(prev => prev.filter(p => p.id !== id));
    }
  };

  // Edit a product
  const editProduct = (product) => {
    const updatedName = prompt("Edit product name:", product.name);
    if (updatedName !== null && updatedName.trim() !== '') {
      setProductsData(prev =>
        prev.map(p => (p.id === product.id ? { ...p, name: updatedName } : p))
      );
    }
  };

  // Add a new product
  const addProduct = (newProduct) => {
    // Ensure the new product has all required fields including stock and status
    const productWithStatus = {
      ...newProduct,
      stock: newProduct.stock || 0,
      status: newProduct.stock > 10 ? 'In Stock' : newProduct.stock > 0 ? 'Low Stock' : 'Out of Stock'
    };
    
    setProductsData(prev => [...prev, productWithStatus]);
  };

  // Get product by ID
  const getProductById = (id) => {
    return productsData.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      productsData,
      setProductsData,
      updateStockOnOrder,
      updateProductStock,
      handleStockChange,
      deleteProduct,
      editProduct,
      addProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};