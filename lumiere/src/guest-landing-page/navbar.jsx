import './navbar.css';
import logo from './assets/logo.svg';

function Navbar({ scrollToSignUp }) {
    return (
        <header className="sticky-top shadow-sm bg-white p-2">
            <nav className="navbar custom-navbar d-flex align-items-center justify-content-between">
                <img src={logo} alt="logo" className="logo-img" />

                

                <div className="nav-icons">
                    <button className="signUp-btn" onClick={scrollToSignUp}>
                        Sign Up
                    </button>
                </div>
            </nav>
        </header>
    );
}


export default Navbar;