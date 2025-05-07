import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './assets/logo.svg';

function Navbar(){
    

    return(
        <>
           <header className="sticky-top shadow-sm bg-white p-2"> 
                <nav className="navbar">
                    <img src={logo} alt="logo" />
                    <ul className='nav-ul'>
                        <li><Link to={"/User"}>Home</Link></li>
                        <li><Link to={"/Products"}>Products</Link></li>
                        <li><Link to={"/Pages"}>About</Link></li>
                        
                        <li>Contact Us</li>
                        
                    </ul>

                    <div className="nav-icons">
                        <Link to={"/Profile"}><i className="fa-solid fa-circle-user"></i></Link>
                        <Link to={"/AddToCart"}><i class="fa-solid fa-cart-shopping"></i></Link>
                       
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;