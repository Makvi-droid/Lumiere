
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
                        <h2>Celestia</h2>
                        <p className='price'>199.99 php</p>
                    </div>
                    <div className="product-card">
                        <img src={ring2} alt="Aurora Glow"/>
                        <h2>Aurora Glow</h2>
                        <p className='price'>149.99 php</p>
                        
                    </div>
                    <div className="product-card">
                        <img src={ring3} alt="Sapphire Whisper"/>
                        <h2>Sapphire Whisper</h2>
                        <p className='price'>299.99 php</p>
                        
                    </div>

                    <div className="product-card">
                        <img src={necklace1} alt="Regal Charm"/>
                        <h2>Regal Charm</h2>
                        <p className='price'>249.99 php</p>
                        
                    </div>
                    <div className="product-card">
                        <img src={necklace2} alt="Velvet Shine"/>
                        <h2>Velvet Shine</h2>
                        <p className='price'>199.99 php</p>
                        
                    </div>
                    <div className="product-card">
                        <img src={necklace3} alt="Celestial Grace"/>
                        <h2>Celestial Grace</h2>
                        <p className='price'>179.99 php</p>
                        
                    </div>

                    <div className="product-card">
                        <img src={earrings1} alt="Amour Spark"/>
                        <h2>Amour Spark</h2>
                        <p className='price'>129.99 php</p>
                        
                    </div>
                    <div className="product-card">
                        <img src={earrings2} alt="Sapphire Starlight"/>
                        <h2>Sapphire Starlight</h2>
                        <p className='price'>99.99 php</p>
                       
                    </div>
                    <div className="product-card">
                        <img src={earrings3} alt="Soulmate Studs"/>
                        <h2>Soulmate Studs</h2>
                        <p className="price" >259.99 php</p>
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;