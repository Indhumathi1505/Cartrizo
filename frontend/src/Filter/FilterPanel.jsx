import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({ isOpen, onClose }) => {
  const [showMore, setShowMore] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="filter-overlay">
      <div className="filter-box">
        {/* ================= HEADER ================= */}
        <div className="filter-header">
          <h2>FILTERS</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* ================= BASIC FILTERS ================= */}
        {!showMore && (
          <>
            {/* PRICE RANGE */}
            <div className="filter-section">
              <h4>PRICE RANGE</h4>
              <input
                className="price-range"
                type="range"
                min="200000"
                max="5000000"
              />
              <div className="price-values">
                <span>2,00,000</span>
                <span>50,00,000</span>
              </div>
            </div>

            {/* BRAND FILTER */}
            <div className="filter-section">
              <h4>Brand Filter</h4>
              <div className="checkbox-grid">
                {[
                  "Tata", "Audi", "Rolls Royce", "Ford",
                  "Hyundai", "Toyota", "Kia", "Suzuki",
                  "BMW", "Honda"
                ].map((brand) => (
                  <label key={brand}>
                    <input type="checkbox" /> {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* CAR TYPE */}
            <div className="filter-section">
              <h4>Car Type</h4>
              <div className="pill-group">
                <span>SUV</span>
                <span>Luxury</span>
                <span>Sedan</span>
                <span>Electric</span>
              </div>
            </div>

            {/* TRANSMISSION */}
            <div className="filter-section">
              <h4>Transmission</h4>
              <div className="pill-group">
                <span>Manual</span>
                <span>Automatic</span>
              </div>
            </div>

            {/* FUEL TYPE */}
            <div className="filter-section">
              <h4>Fuel type</h4>
              <div className="radio-group">
                <label><input type="radio" name="fuel" /> Petrol</label>
                <label><input type="radio" name="fuel" /> Diesel</label>
                <label><input type="radio" name="fuel" /> CNG</label>
                <label><input type="radio" name="fuel" /> Electric</label>
              </div>
            </div>
          </>
        )}

        {/* ================= MORE FILTERS ================= */}
        {showMore && (
          <>
            {/* KM DRIVEN */}
            <div className="filter-section">
              <h4>KM Driven Filter</h4>
              <div className="pill-group">
                <span>Below 10,000</span>
                <span>10,000 - 30,000</span>
                <span>30,000 - 60,000</span>
                <span>60,000 - 1,00,000</span>
                <span>Above 1,00,000</span>
              </div>
            </div>

            {/* COLOR BASED */}
            <div className="filter-section">
              <h4>Color Based</h4>
              <div className="checkbox-grid">
                {[
                  "Black", "Blue",
                  "Grey", "Green",
                  "B & W", "Red",
                  "Purple", "White",
                  "Silver"
                ].map((color) => (
                  <label key={color}>
                    <input type="checkbox" /> {color}
                  </label>
                ))}
              </div>
            </div>

            {/* YEAR */}
            <div className="filter-section">
              <h4>Year</h4>
              <select className="year-select">
                <option>Select Year</option>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i}>{2024 - i}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* ================= ACTION BUTTONS ================= */}
        <div className="filter-actions">
          <button
            className="more-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Previous" : "Next"}
          </button>

          {showMore && <button className="apply-btn">Apply</button>}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
