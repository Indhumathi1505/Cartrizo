import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

import carImg from "../assets/car.jpg";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  // Handle Google login success
  const handleGoogleSuccess = (response) => {
    try {
      const user = jwtDecode(response.credential);

      console.log("Google User:", user);

      alert(`Welcome ${user.name}`);

      // Navigate to info page after successful login
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
    <div className="signup-container">
      <div className="signup-card">

        {/* LEFT PANEL */}
        <div className="signup-left">
          <div className="semicircle"></div>
          <img src={carImg} alt="Car" className="car-image" />
          <div className="left-text">
            <h1>SIGNUP</h1>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="signup-right">
          <h2>Create Account</h2>
          <p className="subtitle">Register to explore our website</p>

          <div className="form-group">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>

          <button className="signup-btn" onClick={() => navigate("/info")}>
            Signup
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

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
