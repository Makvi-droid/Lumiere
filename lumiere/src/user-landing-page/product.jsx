
import './product.css';

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
    return(
        <>
            <div className="products">
                <h1 className='product-h1'>Products</h1>
                <div className="product-container" id='price'>
                    <div className="product-card">
                        <img src={ring1} alt="Celestia"/>
                       
                    </div>
                    <div className="product-card">
                        <img src={ring2} alt="Aurora Glow"/>
                       
                        
                    </div>
                    <div className="product-card">
                        <img src={ring3} alt="Sapphire Whisper"/>
                        
                        
                    </div>

                    <div className="product-card">
                        <img src={necklace1} alt="Regal Charm"/>
                        
                        
                    </div>
                    <div className="product-card">
                        <img src={necklace2} alt="Velvet Shine"/>
                        
                        
                    </div>
                    <div className="product-card">
                        <img src={necklace3} alt="Celestial Grace"/>
                       
                        
                    </div>

                    <div className="product-card">
                        <img src={earrings1} alt="Amour Spark"/>
                        
                    </div>
                    <div className="product-card">
                        <img src={earrings2} alt="Sapphire Starlight"/>
                       
                       
                    </div>
                    <div className="product-card">
                        <img src={earrings3} alt="Soulmate Studs"/>
                        
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;