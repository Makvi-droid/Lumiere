import React, { useState } from 'react';
import { useCart } from '../profile-page/cartContext';
import './product-cards.css';
import { assets } from './assets/assets';


function Rings() {
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

  return (
    <>
      <h1 className="text-center my-5 fw-bold">RINGS</h1>
      
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
      </div>
      
      {/* Add to Cart Modal */}
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
                    <p className="mt-3 fs-5">Do you want to add this item to your cart?</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={confirmAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
      
      <div className="row g-4 justify-center" id="Rings">
        
        {/* Product 1 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow product-card border-0">
            <div className="product-image-container">
              <img src={assets.ring1} 
                className="card-img-top product-image" alt="Celestial Halo Ring" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Celestial Halo</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱559.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold" 
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="1" 
                data-name="Celestial Halo" 
                data-price="559.00" 
                data-image={assets.ring1}>
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
                src={assets.ring2} 
                className="card-img-top product-image" 
                alt="Moonstone Mirage Ring" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Elysian Grace</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱399.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="2" 
                data-name="Elysian Grace" 
                data-price="399.00"
                data-image={assets.ring2}>
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
                src={assets.ring3} 
                className="card-img-top product-image" 
                alt="Eternal Bloom Ring" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Regalia Halo</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱269.00</p>
              <button className="btn mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="3" 
                data-name="Regalia Halo" 
                data-price="269.00"
                data-image={assets.ring3}>
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
                src={assets.ring4} 
                className="card-img-top product-image" 
                alt="Majesty Spark" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Majesty Spark</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱349.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="4" 
                data-name="Majesty Spark" 
                data-price="349.00"
                data-image={assets.ring4} >
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
                src={assets.ring5} 
                className="card-img-top product-image" 
                alt="Crystal Embrace Ring" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Velvet Ember</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱859.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="5" 
                data-name="Velvet Ember" 
                data-price="859.00"
                data-image={assets.ring5} >
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
                src={assets.ring6} 
                className="card-img-top product-image" 
                alt="Crystal Élan" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Crystal Élan</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱859.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="6" 
                data-name="Crystal Élan" 
                data-price="859.00"
                data-image={assets.ring6}>
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
                src={assets.ring7} 
                className="card-img-top product-image" 
                alt="Monarch Kiss" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Monarch Kiss</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱859.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="7" 
                data-name="Monarch Kiss" 
                data-price="859.00"
                data-image={assets.ring7}>
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
                src={assets.ring8} 
                className="card-img-top product-image" 
                alt="Silken Aurora" 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            </div>
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title fw-bold mb-2">Silken Aurora</h5>
              <p className="card-text fw-bold text-primary fs-5 mb-3">₱859.00</p>
              <button className="btn btn-primary mt-auto py-2 fw-bold"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="8" 
                data-name="Silken Aurora" 
                data-price="859.00"
                data-image={assets.ring8} >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      
     
    </>
  );
}

export default Rings;