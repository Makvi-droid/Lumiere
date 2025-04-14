import './navbar.css';
import logo from './assets/logo.svg';

function Navbar({ scrollToSignUp }) {
    return (
        <header className="sticky-top shadow-sm bg-white p-2">
            <nav className="navbar custom-navbar d-flex align-items-center justify-content-between">
                <img src={logo} alt="logo" className="logo-img" />

                <ul className="nav-ul d-flex list-unstyled m-0 flex-grow-1 justify-content-center gap-3">
                    <li className="nav-item">Home</li>
                    <li className="nav-item">About</li>
                    <li className="nav-item">Contact Us</li>
                </ul>

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