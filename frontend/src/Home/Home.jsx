import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FilterPanel from "../Filter/FilterPanel";
import Footer from "../Footer/Footer";
import "./Home.css";

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

import teslaImg from "../assets/cars/tesla.jpg";
import fordImg from "../assets/cars/ford.jpg";
import hondaImg from "../assets/cars/honda.jpg";

/* ==== Data ==== */
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

const CARS = [
  {
    name: "Tesla Model 3 Standard Range Plus",
    price: "Rs.56,690",
    location: "Florida, USA",
    year: 2020,
    drive: "Rear-wheel Drive",
    fuel: "Electric",
    seats: 5,
    img: teslaImg,
  },
  {
    name: "Ford F-250 Super Duty",
    price: "Rs.82,098",
    location: "Milan, Italy",
    year: 2021,
    drive: "Four-wheel Drive",
    fuel: "Diesel",
    seats: 5,
    img: fordImg,
  },
  {
    name: "Honda Pilot Touring 7-Passenger",
    price: "Rs.43,735",
    location: "Caracas, Venezuela",
    year: 2021,
    drive: "All-wheel Drive",
    fuel: "Gasoline",
    seats: 7,
    img: hondaImg,
  },
];

/* ==== Helper ==== */
const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

/* ==== Recommended Cars Component ==== */
const RecommendedCars = () => (
  <section className="recommended-cars">
    <h2>Recommended Cars</h2>
    <div className="car-cards">
      {CARS.map((car, idx) => (
        <div className="car-card" key={idx}>
          <span className="new-badge">New</span>
          <img src={car.img} alt={car.name} />
          <h3>{car.name}</h3>
          <p className="price">{car.price}</p>
          <p className="location">{car.location}</p>
          <div className="car-info">
            <span>📅 {car.year}</span>
            <span>🛞 {car.drive}</span>
            <span>⛽ {car.fuel}</span>
            <span>👥 {car.seats}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ==== Main Homepage Component ==== */
export default function CartrizoHomepage() {
  const navigate = useNavigate();
  const brandsRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const scrollBrands = (direction) => {
    if (brandsRef.current) {
      brandsRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
    }
  };

  return (
    <div className="cartrizo-root">

      {/* Side Menu */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>✖</button>
        <h2 className="menu-title">Cartrizo</h2>
        <ul className="menu-items">
          {["🏠 Home", "🚗 New cars", "🚘 Used cars", "💰 Sell cars", "❤️ Favourites", "⭐ Rate us"].map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <div className="menu-footer">
          <p>TOLL FREE NUMBER</p>
          <h3>0806 8441 441</h3>
        </div>
      </div>

      {/* Header */}
      <header className="topbar">
        <div className="left-group">
          <button className="hamburger" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
          <div className="brand">
            <img src={hero} alt="logo" className="brand-logo" />
            <h1 className="brand-title">CARTRIZO</h1>
          </div>
        </div>
        <nav className="topnav">
          {[
            { name: "HOME" },
            { name: "ABOUT US" },
            { name: "SIGNUP", action: () => navigate("/signup") },
            { name: "LOGIN", action: () => navigate("/login") },
          ].map((nav, idx) => (
            <button key={idx} className="topnav-n" onClick={nav.action}>{nav.name}</button>
          ))}
        </nav>
      </header>

      

      {/* Filter Panel */}
      <FilterPanel isOpen={showFilter} onClose={() => setShowFilter(false)} />

      {/* Hero Section */}
      <div className="home">
        <div className="hero-container">
          <img src={hero} alt="Cars" className="hero-image" />
          <div className="overlay"></div>
          <div className="search-bar-container">
            <input type="text" placeholder="Search" className="search-input" />
             <button className="search-btn" onClick={() => setShowFilter(true)}>🔽 Filter</button>
          </div>
        </div>
      </div>

      {/* Explore Brands */}
      <section className="explore">Explore By Brand</section>
      <section className="brands-shell">
        <div className="brands-inner">
          <div className="brands-row" ref={brandsRef}>
            {BRANDS.map((b, i) => (
              <Link to={`/brand/${slugify(b.name)}`} className="brand-card" key={i}>
                <div className="brand-card-inner">
                  <img src={b.src} alt={b.name} className="brand-grid-logo" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Cars */}
      <RecommendedCars />

      {/* Footer */}
      <Footer />
    </div>
  );
}
