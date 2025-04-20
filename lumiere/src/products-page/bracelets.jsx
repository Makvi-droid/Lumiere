import React from 'react';

function Bracelets() {
  return (
   <>
     <div className="container-fluid py-3">
      <h1 className="text-center mb-4">BRACELETS</h1>
      
      <div className="row g-3" id="Necklace">
        
        {/* Product 1 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img src="https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="Celestial Halo Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Celestial Halo</h5>
              <p className="card-text fw-bold text-warning mb-2">₱1900.00</p>
              <button className="btn btn-primary btn-sm w-100" 
                data-id="1" 
                data-name="Celestial Halo" 
                data-price="1900.00" 
                data-image="ring_sample.jpg">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 2 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" 
              className="card-img-top" 
              alt="Moonstone Mirage Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Moonstone Mirage</h5>
              <p className="card-text fw-bold text-warning mb-2">₱5000.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="2" 
                data-name="Moonstone Mirage" 
                data-price="5000.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 3 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" 
              className="card-img-top" 
              alt="Eternal Bloom Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Eternal Bloom</h5>
              <p className="card-text fw-bold text-warning mb-2">₱2500.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="3" 
                data-name="Eternal Bloom" 
                data-price="2500.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 4 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" 
              className="card-img-top" 
              alt="Aurora Twist Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Aurora Twist</h5>
              <p className="card-text fw-bold text-warning mb-2">₱3000.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="4" 
                data-name="Aurora Twist" 
                data-price="3000.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 5 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" 
              className="card-img-top" 
              alt="Crystal Embrace Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Crystal Embrace</h5>
              <p className="card-text fw-bold text-warning mb-2">₱4500.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="5" 
                data-name="Crystal Embrace" 
                data-price="4500.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 6 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" 
              className="card-img-top" 
              alt="Moonstone Mirage Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Moonstone Mirage</h5>
              <p className="card-text fw-bold text-warning mb-2">₱5000.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="6" 
                data-name="Moonstone Mirage" 
                data-price="5000.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 7 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" 
              className="card-img-top" 
              alt="Eternal Bloom Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Eternal Bloom</h5>
              <p className="card-text fw-bold text-warning mb-2">₱2500.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="7" 
                data-name="Eternal Bloom" 
                data-price="2500.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Product 8 */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card">
            <img 
              src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" 
              className="card-img-top" 
              alt="Aurora Twist Necklace" />
            <div className="card-body p-2">
              <h5 className="card-title">Aurora Twist</h5>
              <p className="card-text fw-bold text-warning mb-2">₱3000.00</p>
              <button className="btn btn-primary btn-sm w-100"
                data-id="8" 
                data-name="Aurora Twist" 
                data-price="3000.00">
                More Info
              </button>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
   </>
  );
}

export default Bracelets;