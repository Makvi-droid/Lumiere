import './content.css';
import jewelryImg from './assets/img1.jpg';

function Content(){
    return(
        <>
            <section className='body-content'>
                <div className='content'>
                    <div className='right-content'>
                        <h1>Timeless Elegance, 
                        Crafted for You</h1>

                        <h4>Because every piece tells a story</h4>

                        <p>Luxury shouldn’t come with a high price tag. <br/>
                        Explore our beautifully crafted, <br/>
                        high-quality jewelry at prices that let you <br/>shine without breaking the bank. <br/>From elegant everyday 
                        pieces to <br/>stunning statement designs, we make <br/>affordable luxury a reality—because everyone deserves to sparkle.</p>

                        <button className='shop-btn'>Shop Now</button>
                    </div>

                    <div className='left-content'>
                        <img src={jewelryImg} alt="Jewelry Image" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Content;