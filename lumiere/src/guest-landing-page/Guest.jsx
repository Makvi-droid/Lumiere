import { useRef } from 'react';
import Navbar from './navbar.jsx';
import Content from './content.jsx';
import AboutUs from './aboutUs.jsx';
import Product from './product.jsx';
import ContactUs from './contactUs.jsx';
import Developers from './developers.jsx';
import Footer from './footer.jsx';
import SignUp from './signUp.jsx';

function Guest({ setCurrentUser }) {
  const signUpRef = useRef(null); 

  const scrollToSignUp = () => {
    signUpRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar scrollToSignUp={scrollToSignUp} />
      <div ref={signUpRef}>
        <SignUp setCurrentUser={setCurrentUser} />
      </div>
      <Content />
      <AboutUs />
      <Product />
      <ContactUs />
      <Developers />
      <Footer />
    </>
  );
}

export default Guest;
