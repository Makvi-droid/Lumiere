import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Guest from './guest-landing-page/Guest';
import User from './user-landing-page/User';
import Products from './products-page/Products';
import Profile from './profile-page/Profile';
import AddToCart from './add-to-cart/AddToCart';
import { CartProvider } from './profile-page/cartContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Guest setCurrentUser={setCurrentUser} />} />
          <Route path='/User' element={<User currentUser={currentUser} />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/AddToCart' element={<AddToCart/>}/>
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
