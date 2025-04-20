import { Outlet } from 'react-router-dom';
import Navbar from '../user-landing-page/navbar';
import UserProfile from './userProfile';


function Profile(){
    return(
        <>
            <Navbar/>
            <UserProfile/>
            <Outlet/>
        </>
    );
}

export default Profile;