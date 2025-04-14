import { useRef } from 'react';
import Navbar from './navbar.jsx';
import Content from './content.jsx';
import AboutUs from './aboutUs.jsx';
import Product from './product.jsx';
import ContactUs from './contactUs.jsx';
import Developers from './developers.jsx';
import Footer from './footer.jsx';
import SignUp from './signUp.jsx';


function Guest() {
  const signUpRef = useRef(null); 

  const scrollToSignUp = () => {
      signUpRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    
    <>
        <Navbar scrollToSignUp={scrollToSignUp} />
        <Content />
        <AboutUs />
        <Product />  
        <ContactUs />
        <Developers />
        <div ref={signUpRef}>
          <SignUp />
        </div>
        <Footer />
    </>
  )
}

export default Guest;
