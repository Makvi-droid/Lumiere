import React, { useState } from 'react';
import { useCart } from '../profile-page/cartContext';
import './product-cards.css';


function Necklaces() {
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
    <div className="container-fluid py-3">
      <h1 className="text-center mb-4">NECKLACES</h1>
      
      {/* Add to Cart Toast Notification */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="addToCartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Shopping Cart</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Item added to your cart successfully!
          </div>
        </div>
      </div>
      
      {/* Add to Cart Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{display: showModal ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add to Cart</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {selectedProduct && (
                <div className="d-flex align-items-center">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="me-3" 
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h5 className="mb-1">{selectedProduct.name}</h5>
                    <p className="text-warning mb-0">₱{selectedProduct.price}</p>
                  </div>
                </div>
              )}
              <p className="mt-3">Do you want to add this item to your cart?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={confirmAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
      
      <div className="row g-3" id="Rings">
        
        {/* Product 1 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" className="card-img-top" alt="Celestial Halo Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Celestial Halo</h5>
              <p className="card-text fw-bold text-warning mb-2">₱1900.00</p>
              <button className="btn btn-primary btn-sm mt-auto" 
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="1" 
                data-name="Celestial Halo" 
                data-price="1900.00" 
                data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 2 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" 
              className="card-img-top" 
              alt="Moonstone Mirage Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Moonstone Mirage</h5>
              <p className="card-text fw-bold text-warning mb-2">₱5000.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="2" 
                data-name="Moonstone Mirage" 
                data-price="5000.00"
                data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 3 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" 
              className="card-img-top" 
              alt="Eternal Bloom Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Eternal Bloom</h5>
              <p className="card-text fw-bold text-warning mb-2">₱2500.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="3" 
                data-name="Eternal Bloom" 
                data-price="2500.00"
                data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 4 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" 
              className="card-img-top" 
              alt="Aurora Twist Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Aurora Twist</h5>
              <p className="card-text fw-bold text-warning mb-2">₱3000.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="4" 
                data-name="Aurora Twist" 
                data-price="3000.00"
                data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 5 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" 
              className="card-img-top" 
              alt="Crystal Embrace Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Crystal Embrace</h5>
              <p className="card-text fw-bold text-warning mb-2">₱4500.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="5" 
                data-name="Crystal Embrace" 
                data-price="4500.00"
                data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 6 - Duplicate of Product 2 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" 
              className="card-img-top" 
              alt="Moonstone Mirage Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Moonstone Mirage</h5>
              <p className="card-text fw-bold text-warning mb-2">₱5000.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="6" 
                data-name="Moonstone Mirage" 
                data-price="5000.00"
                data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 7 - Duplicate of Product 3 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" 
              className="card-img-top" 
              alt="Eternal Bloom Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Eternal Bloom</h5>
              <p className="card-text fw-bold text-warning mb-2">₱2500.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="7" 
                data-name="Eternal Bloom" 
                data-price="2500.00"
                data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 8 - Duplicate of Product 4 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card ">
            <img 
              src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" 
              className="card-img-top" 
              alt="Aurora Twist Ring" />
            <div className="card-body p-2 d-flex flex-column">
              <h5 className="card-title">Aurora Twist</h5>
              <p className="card-text fw-bold text-warning mb-2">₱3000.00</p>
              <button className="btn btn-primary btn-sm mt-auto"
                onClick={(e) => handleAddToCartClick(e.currentTarget)}
                data-id="8" 
                data-name="Aurora Twist" 
                data-price="3000.00"
                data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Necklaces;