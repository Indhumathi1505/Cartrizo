import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode }from "jwt-decode"; // Make sure to use default import

import loginCar from "../assets/car.jpg";
import googleicon from "../assets/google.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  // CAPTCHA state
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");

  // Generate random CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
    setInputCaptcha(""); // Clear input when refreshing
  };

  // Generate CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Verify CAPTCHA
  const verifyCaptcha = () => {
    if (inputCaptcha === captcha) {
      alert("CAPTCHA Verified! You can login.");
      return true;
    } else {
      alert("Incorrect CAPTCHA. Please try again.");
      generateCaptcha(); // Refresh CAPTCHA on failure
      return false;
    }
  };

  // Handle login button click
  const handleLogin = () => {
    if (verifyCaptcha()) {
      // Proceed with login logic (email/password verification)
      navigate("/info");
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = (response) => {
    try {
      const user = jwtDecode(response.credential);
      console.log("Google User:", user);

      alert(`Welcome ${user.name}`);
      navigate("/info");
    } catch (error) {
      console.error("JWT Decode Error:", error);
      alert("Google Sign In Failed");
    }
  };

  // Handle Google login failure
  const handleGoogleError = () => {
    alert("Google Sign In Failed");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* LEFT PANEL */}
        <div className="login-left">
          <div className="semicircle-shape"></div>
          <h1>
            LOGIN <br /> PAGE
          </h1>
        </div>

        {/* MIDDLE IMAGE */}
        <div className="login-middle">
          <img src={loginCar} alt="Login Car" />
        </div>

        {/* RIGHT FORM */}
        <div className="login-right">
          <h2>Login</h2>
          <p className="welcome-text">
            Welcome back! Please enter your details
          </p>

          <div className="form-group">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            {/* CAPTCHA ROW */}
            <div className="captcha-row">
              <div className="captcha-box">
                {captcha}{" "}
                <span className="refresh" onClick={generateCaptcha}>
                  ⟳
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter the captcha"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
              />
            </div>

            <Link className="forgot-link" to="/forgot-password">
              Forgot Password
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <p className="signup-redirect">
            Don’t have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
