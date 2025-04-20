// CartContext.js
import { createContext, useContext, useState } from "react";

// Create a context to manage cart state
const CartContext = createContext();

// Custom hook to access cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
