import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Guest from './guest-landing-page/Guest';
import User from './user-landing-page/User';
import Products from './products-page/Products';
import Profile from './profile-page/Profile';
import AddToCart from './add-to-cart/AddToCart';
import { CartProvider } from './profile-page/cartContext';
import AdminPage from './admin-page/AdminPage';
import { OrderProvider } from './add-to-cart/OrderContext';
import Dashboard from './admin-page/components/Dashboard';
import { ProductProvider } from './products-page/ProductContext';
import Pages from './pages/Pages.Jsx';
import MyOrders from './profile-page/MyOrders';
import ContactUsMain from './contact-us-page/ContactUsMain';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ProductProvider>
    <OrderProvider>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Guest setCurrentUser={setCurrentUser} />} />
          <Route path='/User' element={<User currentUser={currentUser} />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/AddToCart' element={<AddToCart />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/MyOrders' element={<MyOrders/>}/>
          <Route path='/Pages' element={<Pages/>}/>
          <Route path='/ContactUs' element={<ContactUsMain/>}/>
        </Routes>
      </CartProvider>
    </OrderProvider>
    </ProductProvider>
  );
}

export default App;