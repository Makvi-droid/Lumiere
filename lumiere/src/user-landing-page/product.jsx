import './product.css';
import React, { useState } from 'react';
import { useCart } from '../profile-page/cartContext';
import Rings from '../products-page/rings';
import Bracelets from '../products-page/Bracelets';
import Necklaces from '../products-page/necklaces';

import ring1 from './assets/ring1.jpg';
import ring2 from './assets/ring2.jpg';
import ring3 from './assets/ring3.jpg';

import necklace1 from './assets/necklace1.jpg';
import necklace2 from './assets/necklace2.jpg';
import necklace3 from './assets/necklace3.jpg';

import earrings1 from './assets/earrings1.jpg';
import earrings2 from './assets/earrings2.jpg';
import earrings3 from './assets/earrings3.jpg';



function Product(){
     const { addToCart } = useCart();
      const [showModal, setShowModal] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState(null);
      
      const handleAddToCartClick = (productData) => {
        setSelectedProduct({
          id: productData.getAttribute('data-id'),
          name: productData.getAttribute('data-name'),
          price: productData.getAttribute('data-price'),
          image: productData.getAttribute('data-image')
        });
        setShowModal(true);
      };
      
      const confirmAddToCart = () => {
        addToCart(selectedProduct);
        setShowModal(false);
        // Optional: Show toast notification instead of alert
        const toastElement = document.getElementById('addToCartToast');
        if (toastElement) {
          const bsToast = new window.bootstrap.Toast(toastElement);
          bsToast.show();
        }
      };

    return(
        <>
           <Rings/>
            <Bracelets/>
            <Necklaces/>
        </>
    );
}

export default Product;