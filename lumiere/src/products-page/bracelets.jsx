import React, { useState, useEffect } from 'react';
import { useCart } from '../profile-page/cartContext';
import { useProducts } from '../products-page/ProductContext'; // Import the ProductContext
import './product-cards.css';
import { assets } from './assets/assets';


function Bracelets() {
 const { addToCart } = useCart();
   const { productsData } = useProducts(); // Access the products data from context
   const [showModal, setShowModal] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [productStock, setProductStock] = useState(0);
   const [productStatus, setProductStatus] = useState('');
   
   // Function to get status style class based on status
   const getStatusStyles = (status) => {
     switch (status) {
       case 'In Stock':
         return 'bg-success text-white';
       case 'Low Stock':
         return 'bg-warning text-dark';
       case 'Out of Stock':
         return 'bg-danger text-white';
       default:
         return 'bg-info text-white';
     }
   };
   
   const handleAddToCartClick = (productData) => {
     const productId = productData.getAttribute('data-id');
     const name = productData.getAttribute('data-name');
     const price = productData.getAttribute('data-price');
     const image = productData.getAttribute('data-image');
     
     // Find the corresponding product in productsData to get stock information
     const inventoryProduct = productsData.find(p => 
       // Match by name since the IDs might be different between systems
       p.name.toLowerCase() === name.toLowerCase()
     );
     
     setSelectedProduct({
       id: productId,
       name: name,
       price: price,
       image: image
     });
     
     // If product is found in inventory, set its stock info
     if (inventoryProduct) {
       setProductStock(inventoryProduct.stock);
       setProductStatus(inventoryProduct.status);
     } else {
       // Default values if not found
       setProductStock(0);
       setProductStatus('Unknown');
     }
     
     setShowModal(true);
   };
   
   const confirmAddToCart = () => {
     // Only add to cart if stock is available
     if (productStock > 0) {
       addToCart({...selectedProduct, quantity: 1});
       setShowModal(false);
       
       // Optional: Show toast notification
       const toastElement = document.getElementById('addToCartToast');
       if (toastElement) {
         const bsToast = new window.bootstrap.Toast(toastElement);
         bsToast.show();
       }
     } else {
       // Show out of stock message
       const outOfStockToast = document.getElementById('outOfStockToast');
       if (outOfStockToast) {
         const bsToast = new window.bootstrap.Toast(outOfStockToast);
         bsToast.show();
       }
       setShowModal(false);
     }
   };

  return (
   <>
     <h1 className="text-center my-5 fw-bold" style={{fontFamily:"Cinzel Decorative"}}>EARRINGS</h1>
           
           {/* Add to Cart Toast Notification */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div id="addToCartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Shopping Cart</strong>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Item added to your cart successfully!
          </div>
        </div>
        
        {/* Out of Stock Toast */}
        <div id="outOfStockToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header bg-danger text-white">
            <strong className="me-auto">Shopping Cart</strong>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Sorry, this item is out of stock!
          </div>
        </div>
      </div>
      
      {/* Add to Cart Modal - Now with Stock Information */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{display: showModal ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add to Cart</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body p-4">
              {selectedProduct && (
                <div className="d-flex align-items-center">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="me-4 rounded shadow" 
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h4 className="mb-3 fw-bold">{selectedProduct.name}</h4>
                    <p className="text-primary fs-4 fw-bold mb-2">₱{selectedProduct.price}</p>
                    
                    {/* Stock information */}
                    <div className="mt-3 mb-3">
                      <span className={`badge ${getStatusStyles(productStatus)} py-2 px-3 fs-6`}>
                        {productStatus}
                      </span>
                      <p className="mt-2 fs-6">
                        <strong>Available Stock:</strong> {productStock} {productStock === 1 ? 'unit' : 'units'}
                      </p>
                    </div>
                    
                    <p className="mt-3 fs-5">Do you want to add this item to your cart?</p>
                    
                    {/* Show warning if stock is low */}
                    {productStatus === 'Low Stock' && (
                      <p className="text-warning">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        This item has limited stock available.
                      </p>
                    )}
                    
                    {/* Show error if out of stock */}
                    {productStatus === 'Out of Stock' && (
                      <p className="text-danger">
                        <i className="fas fa-times-circle me-2"></i>
                        Sorry, this item is currently out of stock.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => setShowModal(false)}>Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={confirmAddToCart}
                disabled={productStock <= 0}
              >
                {productStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
           
           <div className="row g-4" id="Rings">
             
             {/* Product 1 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img src={assets.earring1} 
                     className="card-img-top product-image" alt="Velvet Gleam" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Velvet Gleam</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱549.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold" 
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="1" 
                     data-name="Velvet Gleam" 
                     data-price="549.00" 
                     data-image={assets.necklace1}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 2 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring2} 
                     className="card-img-top product-image" 
                     alt="Luna Threads" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Luna Threads</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱269.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="2" 
                     data-name="Luna Threads" 
                     data-price="269.00"
                     data-image={assets.earring2}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 3 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring3} 
                     className="card-img-top product-image" 
                     alt="Twilight Teardrops" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Twilight Teardrops</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱439.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="3" 
                     data-name="Twilight Teardrops" 
                     data-price="439.00"
                     data-image={assets.earring4}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 4 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring4} 
                     className="card-img-top product-image" 
                     alt="Aurora Twist Ring" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Radiant Bloom</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱159.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="4" 
                     data-name="Radiant Bloom" 
                     data-price="159.00"
                     data-image={assets.earring4}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 5 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring5} 
                     className="card-img-top product-image" 
                     alt="Silken Glint" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Silken Glint</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱469.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="5" 
                     data-name="Silken Glint" 
                     data-price="469.00"
                     data-image={assets.earring5}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 6 - Duplicate of Product 2 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring6} 
                     className="card-img-top product-image" 
                     alt="Regalia Flicker" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Regalia Flicker</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱629.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="6" 
                     data-name="Regalia Flicker" 
                     data-price="629.00"
                     data-image={assets.earring6}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 7 - Duplicate of Product 3 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring7} 
                     className="card-img-top product-image" 
                     alt="Noble Shine" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Noble Shine</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱879.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="7" 
                     data-name="Noble Shine" 
                     data-price="879.00"
                     data-image={assets.earring7}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Product 8 - Duplicate of Product 4 */}
             <div className="col-6 col-md-4 col-lg-3">
               <div className="card h-100 shadow product-card border-0">
                 <div className="product-image-container">
                   <img 
                     src={assets.earring8} 
                     className="card-img-top product-image" 
                     alt="Sovereign Spark" 
                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                 </div>
                 <div className="card-body p-3 d-flex flex-column">
                   <h5 className="card-title fw-bold mb-2">Sovereign Spark</h5>
                   <p className="card-text fw-bold text-primary fs-5 mb-3">₱239.00</p>
                   <button className="btn btn-primary mt-auto py-2 fw-bold"
                     onClick={(e) => handleAddToCartClick(e.currentTarget)}
                     data-id="8" 
                     data-name="Sovereign Spark" 
                     data-price="239.00"
                     data-image={assets.earring8}>
                     Add To Cart
                   </button>
                 </div>
               </div>
             </div>
           </div>
           
          
   </>
  );
}

export default Bracelets;