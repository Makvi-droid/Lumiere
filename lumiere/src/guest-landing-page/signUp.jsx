import { useState, useEffect } from "react";
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
  
  // New state variables for enhanced functionality
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [showAdminVerification, setShowAdminVerification] = useState(false);
  const [adminVerificationCode, setAdminVerificationCode] = useState('');
  const [inputShake, setInputShake] = useState(false);

  const navigate = useNavigate();

  // Admin verification code 
  const ADMIN_CODE = "A123456";

  // Predefined list of users (5 customers + 1 admin)
  const users = [
    { id: 1, username: "Sgt KatCat", password: "password123", role: "customer", contactNum: "09471057194", gender: "M", email: "katcat@example.com"},
    { id: 2, username: "Biscoff", password: "password123", role: "customer", contactNum: "09671710194", gender: "F", email: "biscoff@example.com" },
    { id: 3, username: "McJobilat", password: "password123", role: "customer", contactNum: "09978057196", gender: "M", email: "mcjobilat@example.com" },
    { id: 4, username: "Gandalf", password: "password123", role: "customer", contactNum: "09841017194", gender: "F", email: "gandalf@example.com" },
    { id: 5, username: "Ryan Reynolds", password: "password123", role: "customer", contactNum: "09334718564", gender: "M", email: "reynolds@example.com" },
    { id: 6, username: "admin", password: "adminpass", role: "admin", contactNum: "09471057194", gender: "M" }
  ];

  // Check for lockout on component load
  useEffect(() => {
    const lockoutInfo = JSON.parse(localStorage.getItem('loginLockout') || '{}');
    if (lockoutInfo.locked && lockoutInfo.expiryTime > Date.now()) {
      setIsLocked(true);
      startLockoutTimer(Math.floor((lockoutInfo.expiryTime - Date.now()) / 1000));
    }
  }, []);

  // Countdown timer for account lockout
  useEffect(() => {
    let interval;
    if (isLocked && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsLocked(false);
            localStorage.removeItem('loginLockout');
            setLoginAttempts(0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isLocked, lockoutTimer]);

  // Function to start the lockout timer
  const startLockoutTimer = (seconds) => {
    setLockoutTimer(seconds);
    const expiryTime = Date.now() + seconds * 1000;
    localStorage.setItem('loginLockout', JSON.stringify({
      locked: true,
      expiryTime
    }));
  };

  // Handle login logic
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if account is locked
    if (isLocked) {
      setErrorMessage(`Account is locked. Try again in ${lockoutTimer} seconds.`);
      triggerShakeAnimation();
      return;
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Reset login attempts on successful login
      setLoginAttempts(0);
      
      // For admin users, show verification dialog
      if (user.role === 'admin') {
        setShowAdminVerification(true);
        return;
      }
      
      // For regular users, proceed with login
      completeLogin(user);
    } else {
      // Increment failed login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      // Lock account after 3 failed attempts
      if (newAttempts >= 3) {
        setIsLocked(true);
        startLockoutTimer(300); // 5 minutes (300 seconds)
        setErrorMessage(`Too many failed attempts. Account locked for 5 minutes.`);
      } else {
        setErrorMessage(`Invalid username or password. ${3 - newAttempts} attempts remaining.`);
      }
      
      triggerShakeAnimation();
    }
  };

  // Complete the login process
  const completeLogin = (user) => {
    // Store the user in localStorage to persist across page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Set the logged-in user
    setCurrentUser(user);
    setErrorMessage('');
    
    // Redirect based on role
    navigate(user.role === 'admin' ? "/AdminPage" : "/User");
  };

  // Handle admin verification
  const handleAdminVerify = (e) => {
    e.preventDefault();
    
    if (adminVerificationCode === ADMIN_CODE) {
      // Find admin user again to be safe
      const adminUser = users.find(u => u.username === username && u.role === 'admin');
      if (adminUser) {
        completeLogin(adminUser);
      }
    } else {
      setErrorMessage("Invalid verification code");
      triggerShakeAnimation();
    }
  };

  // Handle sign-up logic
  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if fields are filled
    if (username === "" || password === "" || confirmPassword === "" || email === "") {
      setErrorMessage("All fields must be filled");
      triggerShakeAnimation();
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      triggerShakeAnimation();
      return;
    }

    // Check if username already exists
    if (users.some(user => user.username === username)) {
      setErrorMessage("Username already exists");
      triggerShakeAnimation();
      return;
    }

    // Add the new user to the users array (mock)
    const newUser = { 
      id: users.length + 1, 
      username, 
      password, 
      role: "customer", 
      email,
      contactNum: "" // Added to match the existing user structure
    };
    users.push(newUser); 
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Set the current user
    setCurrentUser(newUser);
    
    setErrorMessage('');
    navigate("/User"); // Switch to login after successful sign-up
  };

  // Trigger shake animation for invalid inputs
  const triggerShakeAnimation = () => {
    setInputShake(true);
    setTimeout(() => setInputShake(false), 500);
  };

  return (
    <div className={`sign-up-container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-in Form */}
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLocked}
              />
            </div>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
              />
            </div>
            <input 
              type="submit" 
              value={isLocked ? `Locked (${lockoutTimer}s)` : "Login"} 
              className="btn solid" 
              disabled={isLocked}
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>

          {/* Sign-up Form */}
          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
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

      {/* Admin Verification Modal */}
      {showAdminVerification && (
        <div className="admin-verification-overlay">
          <div className="admin-verification-modal">
            <h3>Admin Verification</h3>
            <p>Please enter the admin verification code to continue</p>
            <div className={`input-field ${inputShake && errorMessage ? "shake" : ""}`}>
              <i className="fas fa-shield-alt"></i>
              <input
                type="text"
                placeholder="Verification Code"
                value={adminVerificationCode}
                onChange={(e) => setAdminVerificationCode(e.target.value)}
                autoFocus
              />
            </div>
            <div className="admin-verification-actions">
              <button className="btn" onClick={handleAdminVerify}>Verify</button>
              <button className="btn cancel" onClick={() => setShowAdminVerification(false)}>Cancel</button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
      )}

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