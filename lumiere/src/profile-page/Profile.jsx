import { Outlet } from 'react-router-dom';
import Navbar from '../user-landing-page/navbar';
import UserProfile from './userProfile';
import { OrderProvider } from '../add-to-cart/OrderContext';
import Footer from '../user-landing-page/footer'


function Profile(){
    return(
        <>  
            <OrderProvider>
            <Navbar/>
            <UserProfile/>
            <Footer/>
            <Outlet/>
            </OrderProvider>
        </>
    );
}

export default Profile;