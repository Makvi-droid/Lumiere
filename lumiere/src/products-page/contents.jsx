import './contents.css'

function Contents(){
    return(
        <>
        <main>
        <h1>RINGS</h1>
        <section class="products-container" id="Rings">
            
            <div class="product-card">
                <img src="ring_sample.jpg" alt="T-Shirt" class="product-image" />
                <h3>Celestial Halo</h3>
                <p class="price">₱1900.00</p>
                <button class="info-button" data-id="1" data-name="Classic T-Shirt" data-price="1900.00" data-image="ring_sample.jpg">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" alt="Jeans" class="product-image" />
                <h3>Moonstone Mirage</h3>
                <p class="price">₱5000.00</p>
                <button class="info-button" data-id="2" data-name="Slim Fit Jeans" data-price="5000.00" data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" alt="Hoodie" class="product-image" />
                <h3>Eternal Bloom</h3>
                <p class="price">₱2500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="2500.00" data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" alt="Hoodie" class="product-image" />
                <h3>Aurora Twist</h3>
                <p class="price">₱3000.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="3000.00" data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" alt="Hoodie" class="product-image" />
                <h3>Crystal Embrace</h3>
                <p class="price">₱4500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="4500.00" data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" alt="Jeans" class="product-image" />
                <h3>Moonstone Mirage</h3>
                <p class="price">₱5000.00</p>
                <button class="info-button" data-id="2" data-name="Slim Fit Jeans" data-price="5000.00" data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" alt="Hoodie" class="product-image" />
                <h3>Eternal Bloom</h3>
                <p class="price">₱2500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="2500.00" data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" alt="Hoodie" class="product-image" /> 
                <h3>Aurora Twist</h3>
                <p class="price">₱3000.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="3000.00" data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" alt="Hoodie" class="product-image" />
                <h3>Crystal Embrace</h3>
                <p class="price">₱4500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="4500.00" data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">More Info</button>
            </div>

        </section>

        <h1>NECKLACES</h1>
        <section class="products-container" id="Necklace">
            
            <div class="product-card">
                <img src="ring_sample.jpg" alt="T-Shirt" class="product-image" />
                <h3>Celestial Halo</h3>
                <p class="price">₱1900.00</p>
                <button class="info-button" data-id="1" data-name="Classic T-Shirt" data-price="1900.00" data-image="ring_sample.jpg">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" alt="Jeans" class="product-image" />
                <h3>Moonstone Mirage</h3>
                <p class="price">₱5000.00</p>
                <button class="info-button" data-id="2" data-name="Slim Fit Jeans" data-price="5000.00" data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" alt="Hoodie" class="product-image" />
                <h3>Eternal Bloom</h3>
                <p class="price">₱2500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="2500.00" data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" alt="Hoodie" class="product-image" />
                <h3>Aurora Twist</h3>
                <p class="price">₱3000.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="3000.00" data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" alt="Hoodie" class="product-image" />
                <h3>Crystal Embrace</h3>
                <p class="price">₱4500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="4500.00" data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" alt="Jeans" class="product-image" />
                <h3>Moonstone Mirage</h3>
                <p class="price">₱5000.00</p>
                <button class="info-button" data-id="2" data-name="Slim Fit Jeans" data-price="5000.00" data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" alt="Hoodie" class="product-image" />
                <h3>Eternal Bloom</h3>
                <p class="price">₱2500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="2500.00" data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" alt="Hoodie" class="product-image" />
                <h3>Aurora Twist</h3>
                <p class="price">₱3000.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="3000.00" data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" alt="Hoodie" class="product-image" />
                <h3>Crystal Embrace</h3>
                <p class="price">₱4500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="4500.00" data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">More Info</button>
            </div>

        </section>

        <h1>Bracelets</h1>
        <section class="products-container" id="Bracelets">
            
            <div class="product-card">
                <img src="ring_sample.jpg" alt="T-Shirt" class="product-image" />
                <h3>Celestial Halo</h3>
                <p class="price">₱1900.00</p>
                <button class="info-button" data-id="1" data-name="Classic T-Shirt" data-price="1900.00" data-image="ring_sample.jpg">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" alt="Jeans" class="product-image" />
                <h3>Moonstone Mirage</h3>
                <p class="price">₱5000.00</p>
                <button class="info-button" data-id="2" data-name="Slim Fit Jeans" data-price="5000.00" data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" alt="Hoodie" class="product-image" />
                <h3>Eternal Bloom</h3>
                <p class="price">₱2500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="2500.00" data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" alt="Hoodie" class="product-image" />
                <h3>Aurora Twist</h3>
                <p class="price">₱3000.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="3000.00" data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" alt="Hoodie" class="product-image" />
                <h3>Crystal Embrace</h3>
                <p class="price">₱4500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="4500.00" data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640" alt="Jeans" class="product-image" />
                <h3>Moonstone Mirage</h3>
                <p class="price">₱5000.00</p>
                <button class="info-button" data-id="2" data-name="Slim Fit Jeans" data-price="5000.00" data-image="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcfbf242b/images/hi-res/503414FCZAB02_1.jpg?sw=640&sh=640">More Info</button>
            </div>
            
            <div class="product-card">
                <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg" alt="Hoodie" class="product-image" />
                <h3>Eternal Bloom</h3>
                <p class="price">₱2500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="2500.00" data-image="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8093faa5/images/hi-res/50D5PTFUJAA10_1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg" alt="Hoodie" class="product-image" />
                <h3>Aurora Twist</h3>
                <p class="price">₱3000.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="3000.00" data-image="https://dynamic.zacdn.com/qBFi3gYNEEvSt01CIek238KO5G4=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/elli-jewelry-9906-2286616-1.jpg">More Info</button>
            </div>

            <div class="product-card">
                <img src="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg" alt="Hoodie" class="product-image" />
                <h3>Crystal Embrace</h3>
                <p class="price">₱4500.00</p>
                <button class="info-button" data-id="3" data-name="Cotton Hoodie" data-price="4500.00" data-image="https://www.prouds.com.au/content/products/9ct-gold-diamond-heart-ring-8641228-188554.jpg">More Info</button>
            </div>

        </section>

        

       
    </main>

  
    <div class="overlay" id="productOverlay">
        <div class="product-details">
            <span class="close-button" id="closeOverlay">&times;</span>
            <div class="details-content">
                <img id="detailImage" src="" alt="Product" class="detail-image" />
                <div class="detail-info">
                    <h2 id="detailName"></h2>
                    <p class="detail-price">$<span id="detailPrice"></span></p>
                    <div class="size-selection">
                        <label for="size">Size:</label>
                        <select id="size">
                            <option value="S">small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                        </select>
                    </div>
                    <div class="quantity-selection">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" min="1" value="1" />
                    </div>
                    <button id="addToCartBtn" class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>

    
    <div class="cart-overlay" id="cartOverlay">
        <div class="cart-container">
            <span class="close-button" id="closeCart">&times;</span>
            <h2>Your Shopping Cart</h2>
            <div class="cart-items" id="cartItems">
                
            </div>
            <div class="cart-total">
                <h3>Total: $<span id="cartTotal">0.00</span></h3>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    </div>
        </>
    );
}

export default Contents