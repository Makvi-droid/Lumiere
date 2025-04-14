import './contactUs.css'
import cs1 from './assets/cs1.jpg';
import cs2 from './assets/cs2.jpg';
import cs3 from './assets/cs3.jpg';

function ContactUs(){
    return(
        <>
            <section>
                <div className="contactUs-container">
                    
                    <div className="contactUs-left">
                        <h1 className="contactUs-h1">Contact Us</h1>
                        <div className="message-container">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" placeholder="Enter your name" />
                            
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="Enter your email" />

                            <label htmlFor="message">Message:</label>
                            <textarea id="message" placeholder="Write your message here..."></textarea>

                            <button className="send-btn">Send Message</button>
                        </div>
                    </div>

                    
                    <div className="contactUs-right">
                        <div className="image-collage">
                            <img src={cs1} alt="Jewelry 1" className="collage-img img1" />
                            <img src={cs2} alt="Jewelry 2" className="collage-img img2" />
                            <img src={cs3} alt="Jewelry 3" className="collage-img img3" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactUs;