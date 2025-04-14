import Navbar from './navbar.jsx';
import Content from './content.jsx';
import AboutUs from './aboutUs.jsx';
import Product from './product.jsx';
import ContactUs from './contactUs.jsx';
import Developers from './developers.jsx';
import Footer from './footer.jsx';
import { Outlet } from 'react-router-dom';


function User(){
    return(
        <>
            <Navbar />
            
            <Content />
            <AboutUs />
            <Product />  
            <ContactUs />
            <Developers />
            <Footer />
            <Outlet/>
        </>
    );
}

export default User;