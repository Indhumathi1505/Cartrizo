// src/Homepage.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import FilterPanel from "../Filter/FilterPanel";
import "./Home.css";
import Footer from "../Footer/Footer";



/* ==== Images ==== */
import hero from "../assets/hero.jpg";
import audi from "../assets/brands/audi.png";
import bmw from "../assets/brands/bmw.jpg";
import lamborghini from "../assets/brands/lamborghini.jpg";
import ford from "../assets/brands/ford.jpg";
import suzuki from "../assets/brands/suzuki.jpg";
import honda from "../assets/brands/honda.png";
import toyota from "../assets/brands/toyota.jpg";
import bentley from "../assets/brands/bentley.png";
import mercedes from "../assets/brands/mercedes.png";
import jaguar from "../assets/brands/jaguar.png";

/* ==== Brands data ==== */
const BRANDS = [
  { name: "Audi", src: audi },
  { name: "BMW", src: bmw },
  { name: "Lamborghini", src: lamborghini },
  { name: "Ford", src: ford },
  { name: "Suzuki", src: suzuki },
  { name: "Honda", src: honda },
  { name: "Toyota", src: toyota },
  { name: "Bentley", src: bentley },
  { name: "Mercedes", src: mercedes },
  { name: "Jaguar", src: jaguar },
];

/* slug helper */
function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export default function CartrizoHomepage() {
  const brandsRowRef = useRef(null);

  /* ===== STATES ===== */
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  /* ===== HANDLERS ===== */
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollLeft = () => {
    brandsRowRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    brandsRowRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="cartrizo-root">
      {/* ================= SIDE MENU ================= */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>✖</button>

        <h2 className="menu-title">Cartrizo</h2>

        <ul className="menu-items">
          <li>🏠 Home</li>
          <li>🚗 New cars</li>
          <li>🚘 Used cars</li>
          <li>💰 Sell cars</li>
          <li>❤️ Favourites</li>
          <li>⭐ Rate us</li>
        </ul>

        <div className="menu-footer">
          <p>TOLL FREE NUMBER</p>
          <h3>0806 8441 441</h3>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="topbar">
        <div className="left-group">
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="brand">
            <img src={hero} alt="logo" className="brand-logo" />
            <h1 className="brand-title">CARTRIZO</h1>
          </div>
        </div>

        <nav className="topnav">
          <button >HOME</button>
          <button >ABOUT US</button>
          <button >SIGNUP</button>
          <button >LOGIN</button>

        </nav>
      </header>

      {/* ================= SEARCH BAR ================= */}
      <div className="search-wrap">
        <div className="search">
          <input placeholder="Search for your dream car" />

          <button className="search-btn">🔍</button>

          {/* FILTER BUTTON */}
          <button
            className="search-btn"
            onClick={() => setShowFilter(true)}
          >
            🔽 Filter
          </button>
        </div>
      </div>

      {/* ================= FILTER PANEL ================= */}
      <FilterPanel
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
      />

      {/* ================= HERO ================= */}
      <main className="hero-container">
        <div className="hero-card">
          <div className="hero-left">
            <img src={hero} alt="car hero" className="hero-image" />
          </div>

          <div className="hero-right">
            <div className="promo-line">
              Drive with confidence <br /> Buy with trust.
            </div>
            <div className="promo-badge">Welcome to Cartrizo</div>
            <div className="promo-line small">Ranges Starts At</div>
            <div className="price-badge">₹ 3 LAKH /-</div>
          </div>
        </div>
      </main>
        

      {/* ================= EXPLORE ================= */}
      <section className="explore">Explore By Brand</section>

      {/* ================= BRANDS ================= */}
      <section className="brands-shell">
        

        <div className="brands-inner">
          <div className="brands-row" ref={brandsRowRef}>
            {BRANDS.map((b, i) => (
              <Link
                to={`/brand/${slugify(b.name)}`}
                className="brand-card"
                key={i}
              >
                <div className="brand-card-inner">
                  <img src={b.src} alt={b.name} className="brand-grid-logo" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      
      </section>
      <section className="footersec"></section>
    
<Footer />

    </div>
  );
}
