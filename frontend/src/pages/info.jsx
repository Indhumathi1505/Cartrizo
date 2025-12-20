import React from "react";
import "./info.css";

export default function ProfileInfo() {
  return (
    <div className="info-page">
      <div className="info-card">

        <h2 className="info-title">Fill your information</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Email id</label>
          <input type="email" />
        </div>

        <div className="form-group">
          <label>Phone No</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" /> Male</label>
            <label><input type="radio" name="gender" /> Female</label>
            <label><input type="radio" name="gender" /> Other</label>
          </div>
        </div>

        <div className="form-group">
          <label>State</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea rows="4"></textarea>
        </div>

        <button className="save-btn">Save & Continue</button>

      </div>
    </div>
  );
}
