import { useState } from "react";
import "./signUp.css";
import register from "./assets/register.svg";
import log from "./assets/log.svg";

function SignUp() {
    const [signUpMode, setSignUpMode] = useState(false);

    return (
        <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className="btn solid" />
                    </form>

                    {/* Sign-up Form */}
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Confirm Password" />
                        </div>
                        <input type="submit" className="btn" value="Sign up" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
               
                <div className="panel left-panel">
                    <div className="content">
                        <h3 className="h3-new">New here?</h3>
                        <p>
                        Discover timeless elegance with our handcrafted jewelry. Sign up now to unlock exclusive collections, 
                        special discounts, and early access to new arrivals.
                        </p>
                        <button className="btn transparent" onClick={() => setSignUpMode(true)}>
                            Sign up
                        </button>
                    </div>
                    <img src={register} className="image" alt="" />
                </div>

              
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                        Welcome back to a world of luxury and sophistication. 
                        Sign in to explore our latest designs, manage your wishlist, and enjoy a seamless shopping experience.
                        </p>
                        <button className="btn transparent" onClick={() => setSignUpMode(false)}>
                            Sign in
                        </button>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
