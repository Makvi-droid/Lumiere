import { Outlet } from 'react-router-dom';
import Navbar from '../user-landing-page/navbar';
import UserProfile from './userProfile';
import { OrderProvider } from '../add-to-cart/OrderContext';


function Profile(){
    return(
        <>  
            <OrderProvider>
            <Navbar/>
            <UserProfile/>
            <Outlet/>
            </OrderProvider>
        </>
    );
}

export default Profile;