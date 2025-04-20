import './contents.css'

function Contents(){
    return(
        <>
            <div className="overlay" id="productOverlay">
                <div className="product-details">
                    <span className="close-button" id="closeOverlay">&times;</span>
                    <div className="details-content">
                        <img id="detailImage" src="" alt="Product" className="detail-image" />
                        <div className="detail-info">
                            <h2 id="detailName"></h2>
                            <p className="detail-price">$<span id="detailPrice"></span></p>
                            <div className="size-selection">
                                <label for="size">Size:</label>
                                <select id="size">
                                    <option value="S">small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                    <option value="XL">Extra Large</option>
                                </select>
                            </div>
                            <div className="quantity-selection">
                                <label for="quantity">Quantity:</label>
                                <input type="number" id="quantity" min="1" value="1" />
                            </div>
                            <button id="addToCartBtn" className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="cart-overlay" id="cartOverlay">
                <div className="cart-container">
                    <span className="close-button" id="closeCart">&times;</span>
                    <h2>Your Shopping Cart</h2>
                    <div className="cart-items" id="cartItems">
                        
                    </div>
                    <div className="cart-total">
                        <h3>Total: $<span id="cartTotal">0.00</span></h3>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contents