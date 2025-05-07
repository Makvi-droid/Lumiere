// src/context/OrderContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};


export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    const addOrder = (order) => {
        console.log("Adding order:", order); 
        const orderId = `order-${Date.now()}`;
        const currentUserId = order.user?.id || localStorage.getItem('currentUserId'); // Optional fallback
    
        const orderWithId = {
            ...order,
            user: {
                ...order.user,
                id: currentUserId  // 💡 force include user.id
            },
            id: orderId,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };
    
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders, orderWithId];
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    
        return orderId;
    };
    

    const removeOrder = (id) => {
        setOrders((prevOrders) => {
            const updatedOrders = prevOrders.filter(order => order.id !== id);
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prevOrders) => {
            const updatedOrders = prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    useEffect(() => {
        // In case other parts of app modify localStorage directly
        const handleStorageChange = () => {
            const storedOrders = localStorage.getItem('orders');
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <OrderContext.Provider value={{ 
            orders, 
            addOrder, 
            updateOrderStatus,
            getOrderById,
            removeOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
};