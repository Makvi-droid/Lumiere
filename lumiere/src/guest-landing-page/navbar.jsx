import './navbar.css';
import logo from './assets/logo.svg';

function Navbar({ scrollToSignUp }){
    

    return(
        <>
           <header> 
                <nav className="navbar">
                    <img src={logo} alt="logo" />
                    <ul className='nav-ul'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Products</li>
                        <li>Contact Us</li>
                    </ul>

                    <div className="nav-icons">
                        <button className='signUp-btn' onClick={scrollToSignUp}>Sign Up</button>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;