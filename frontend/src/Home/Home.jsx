import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Home/Navbar";
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
    name: "Tesla Model 3",
    price: "Rs.56,690",
    location: "Florida, USA",
    year: 2020,
    drive: "RWD",
    fuel: "Electric",
    seats: 5,
    img: teslaImg,
  },
  {
    name: "Ford F-250",
    price: "Rs.82,098",
    location: "Italy",
    year: 2021,
    drive: "4WD",
    fuel: "Diesel",
    seats: 5,
    img: fordImg,
  },
  {
    name: "Honda Pilot",
    price: "Rs.43,735",
    location: "Venezuela",
    year: 2021,
    drive: "AWD",
    fuel: "Petrol",
    seats: 7,
    img: hondaImg,
  },
];

const slugify = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

export default function Home() {
  const navigate = useNavigate();
  const brandsRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="cartrizo-root">
      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          ✖
        </button>
        <h2 className="menu-title">Cartrizo</h2>
        <ul className="menu-items">
          <li>
            <Link to="/" onClick={toggleMenu}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/new-cars" onClick={toggleMenu}>
              🚗 New cars
            </Link>
          </li>
          <li>
            <Link to="/used-cars" onClick={toggleMenu}>
              🚘 Used cars
            </Link>
          </li>
          <li>
            <Link to="/sell-cars" onClick={toggleMenu}>
              💰 Sell cars
            </Link>
          </li>
          <li>
            <Link to="/favourites" onClick={toggleMenu}>
              ❤️ Favourites
            </Link>
          </li>
          <li>
            <Link to="/rate-us" onClick={toggleMenu}>
              ⭐ Rate us
            </Link>
          </li>
        </ul>
      </div>

      {/* NAVBAR */}
      <Navbar toggleMenu={toggleMenu} />

      {/* FILTER PANEL */}
      <FilterPanel isOpen={showFilter} onClose={() => setShowFilter(false)} />

      {/* HERO SECTION */}
      <div className="home">
        <div className="hero-container">
          <img src={hero} alt="Cars" className="hero-image" />
          <div className="overlay"></div>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search cars..."
            />
            <button
              className="filter-button"
              onClick={() => setShowFilter(true)}
            >
              🔽 Filter
            </button>
          </div>
        </div>
      </div>

      {/* BRANDS SECTION */}
      <section className="brands-shell" ref={brandsRef}>
        <h2 className="explore">Explore Brands</h2>
        <div className="brands-row">
          {BRANDS.map((b) => (
            <div className="brand-card" key={b.name}>
              <div className="brand-card-inner">
                <Link to={`/brand/${slugify(b.name)}`}>
                  <img
                    src={b.src}
                    alt={b.name}
                    className="brand-grid-logo"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMMENDED CARS */}
      <section className="recommended-cars">
        <h2 className="explore">Recommended Cars</h2>
        <div className="car-cards">
          {CARS.map((car) => (
            <div className="car-card" key={car.name}>
              <img src={car.img} alt={car.name} />
              <h3>{car.name}</h3>
              <p className="price">{car.price}</p>
              <p className="location">{car.location}</p>
              <div className="car-info">
                <span>{car.year}</span>
                <span>{car.drive}</span>
                <span>{car.fuel}</span>
                <span>{car.seats} seats</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
