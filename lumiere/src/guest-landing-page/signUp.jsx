import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import register from "./assets/register.svg";
import log from "./assets/log.svg";

function SignUp({ setCurrentUser }) {
  const [signUpMode, setSignUpMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Predefined list of users (5 customers + 1 admin)
  const users = [
    { id: 1, username: "McJobilat", password: "password123", role: "customer" },
    { id: 2, username: "jane_smith", password: "password123", role: "customer" },
    { id: 3, username: "alice_jones", password: "password123", role: "customer" },
    { id: 4, username: "bob_brown", password: "password123", role: "customer" },
    { id: 5, username: "emma_wilson", password: "password123", role: "customer" },
    { id: 6, username: "admin", password: "adminpass", role: "admin" }
  ];

  // Handle login logic
  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Store the user in localStorage to persist across page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Set the logged-in user
      setCurrentUser(user);
      setErrorMessage('');
      
      // Redirect based on role
      navigate(user.role === 'admin' ? "/AdminPage" : "/User");
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  // Handle sign-up logic
  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if fields are filled
    if (username === "" || password === "" || confirmPassword === "" || email === "") {
      setErrorMessage("All fields must be filled");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Add the new user to the users array (mock)
    const newUser = { id: users.length + 1, username, password, role: "customer" };
    users.push(newUser); // You should eventually add logic to persist the users array
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Set the current user
    setCurrentUser(newUser);
    
    setErrorMessage('');
    navigate("/User"); // Switch to login after successful sign-up
  };

  return (
    <div className={`sign-up-container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-in Form */}
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>

          {/* Sign-up Form */}
          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      </div>

      {/* Panels for toggling between sign-in and sign-up */}
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
            <h3>One of us?</h3>
            <p>
              Welcome back to a world of luxury and sophistication. Sign in to explore our latest designs, manage your wishlist, and enjoy a seamless shopping experience.
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
