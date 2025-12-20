import React, { useState, useEffect } from "react";
import "./FilterModal.css";

const BRANDS = [
  "Tata","Audi","Rolls Royce","Ford",
  "Hyundai","Toyota","Kia","Suzuki",
  "BMW","Honda"
];

const CAR_TYPES = ["SUV","Luxury","Sedan","Electric"];
const TRANSMISSIONS = ["Manual","Automatic"];
const FUELS = ["Petrol","Diesel","CNG","Electric"];

export default function FilterModal() {
  const [open, setOpen] = useState(false);

  // Filter state
  const [priceMin, setPriceMin] = useState(200000);
  const [priceMax, setPriceMax] = useState(5000000);
  const [selectedBrands, setSelectedBrands] = useState(new Set(["Tata","Audi","BMW"]));
  const [selectedCarTypes, setSelectedCarTypes] = useState(new Set(["SUV"]));
  const [transmission, setTransmission] = useState("Manual");
  const [fuel, setFuel] = useState("Petrol");

  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleBrand = (b) => {
    setSelectedBrands(prev => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  };

  const toggleCarType = (t) => {
    setSelectedCarTypes(prev => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  return (
    <>
      <button className="filter-open-btn" onClick={() => setOpen(true)}>Filters</button>

      {open && (
        <div className="filter-overlay" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="filter-panel">
            <button className="filter-close" onClick={() => setOpen(false)} aria-label="Close">×</button>

            <h2 className="filter-title">FILTERS</h2>

            <section className="filter-section price-section">
              <label className="section-label">PRICE RANGE</label>
              <div className="price-values">
                <span>₹{priceMin.toLocaleString()}</span>
                <span>₹{priceMax.toLocaleString()}</span>
              </div>
              <div className="range-group">
                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={10000}
                  value={priceMin}
                  onChange={e => {
                    const v = Number(e.target.value);
                    if (v <= priceMax) setPriceMin(v);
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={10000}
                  value={priceMax}
                  onChange={e => {
                    const v = Number(e.target.value);
                    if (v >= priceMin) setPriceMax(v);
                  }}
                />
              </div>
            </section>

            <section className="filter-section brand-section">
              <label className="section-label">Brand Filter</label>
              <div className="brand-grid">
                {BRANDS.map((b) => (
                  <label key={b} className={`brand-item ${selectedBrands.has(b) ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.has(b)}
                      onChange={() => toggleBrand(b)}
                    />
                    <span className="brand-name">{b}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="filter-section pills-section">
              <label className="section-label">Car Type</label>
              <div className="pills-row">
                {CAR_TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`pill ${selectedCarTypes.has(t) ? "active" : ""}`}
                    onClick={() => toggleCarType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="section-label" style={{ marginTop: 12 }}>Transmission</label>
              <div className="pills-row">
                {TRANSMISSIONS.map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`pill ${transmission === t ? "active" : ""}`}
                    onClick={() => setTransmission(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <section className="filter-section fuel-section">
              <label className="section-label">Fuel type</label>
              <div className="fuel-row">
                {FUELS.map(f => (
                  <label key={f} className={`fuel-item ${fuel === f ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="fuel"
                      value={f}
                      checked={fuel === f}
                      onChange={() => setFuel(f)}
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="filter-actions">
              <button className="more-btn">More &gt;&gt;&gt;</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
