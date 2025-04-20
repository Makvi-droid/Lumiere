import { useEffect, useState } from 'react';
import Navbar from './navbar.jsx';
import Content from './content.jsx';
import AboutUs from './aboutUs.jsx';
import Product from './product.jsx';
import ContactUs from './contactUs.jsx';
import Developers from './developers.jsx';
import Footer from './footer.jsx';
import { Outlet } from 'react-router-dom';


function User({ currentUser }) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      
      {showToast && currentUser && (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 1055 }}
        >
          <div className="toast show bg-primary text-white fs-5 text-center" role="alert">
            <div className="toast-header bg-dark text-white justify-content-center">
              <strong className="me-auto fs-4">Welcome</strong>
              <button
                type="button"
                className="btn-close btn-close-white ms-2 mb-1"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body fw-bold">
              Hello, <span className="text-warning">{currentUser.username}</span>! 🎉
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <Content />
      <AboutUs />
      <Product />
      <ContactUs />
      <Developers />
      <Footer />
      <Outlet />
    </>
  );
}

export default User;
