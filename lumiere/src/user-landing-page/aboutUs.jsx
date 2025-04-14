import './aboutUs.css'
import jewelryVideo from './assets/jewelry-vid.mp4';
import cardImage1 from './assets/research-and-development.png';
import cardImage2 from './assets/customer-service.png';
import cardImage3 from './assets/stars.png';

function AboutUs(){
    return(
        <>
            <section>
                <div className='aboutUs-content'>
                    <div className='aboutUs-right-content'>
                        <video controls autoPlay loop muted id='video'>
                            <source src={jewelryVideo} type="video/mp4"/>
                        </video>
                    </div>

                    <div className='aboutUs-left-content'>
                        <h1>Why choose Us?</h1>
                        <p>Jewelry is more than just an accessory—it is a reflection of individuality, style, and timeless elegance. 
                            At Lumiere, we believe that luxury should be accessible to everyone, which is why we are committed to 
                            offering high-quality, beautifully crafted pieces at affordable prices. Each piece in our collection is 
                            designed with precision and care, ensuring that you receive jewelry that is not only stunning but also made 
                            to last.

                        At Lumiere, customer satisfaction is at the heart of what we do. With fast and secure shipping, we ensure that 
                        your favorite pieces reach you safely and on time. Our dedicated support team is always ready to assist, 
                        providing a seamless shopping experience from start to finish. We believe that everyone deserves to shine, 
                        and our jewelry is designed to help you do just that.
                        Choose Lumiere—because elegance, quality, and affordability should go hand in hand.</p>
                    </div>
                </div>

                <div className='aboutUs-cards'>
                    <div className='card card1'>
                       <img src={cardImage1} alt="" />
                        <span className='sub-title'>Innovation And Design</span>
                        <p>We merge timeless elegance with modern creativity to craft unique, high-quality jewelry. 
                            Each piece is designed with precision, ensuring beauty, durability, and a touch of innovation in 
                            every detail.</p>
                    </div>
                    <div className='card card2'>
                        <img src={cardImage2} alt="" />
                        <span className='sub-title'>Exceptional Customer Support</span>
                        <p>Your satisfaction is our priority! We provide fast, friendly, and reliable support to ensure a seamless 
                            shopping experience. Need help? We’re always here for you.</p>
                    </div>
                    <div className='card card2'>
                        <img src={cardImage3} alt="" />
                        <span className='sub-title'>Quality Craftsmanship</span>
                        <p>Every piece is meticulously crafted with precision and care, using the finest materials to ensure lasting 
                            beauty and durability. Experience jewelry that’s made to shine for a lifetime.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUs;