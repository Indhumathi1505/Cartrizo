import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellCar.css";
import Navbar from "../Home/Navbar";
import sellimage from "../assets/car.jpg";

export default function SellCar() {
  const navigate = useNavigate();

  const [car, setCar] = useState({
    title: "",
    bodyType: "",
    model: "",
    year: "",
    exteriorColor: "",
    description: "",
    fuelType: "",
    mileage: "",
    engineCapacity: "",
    price: "",
    condition: "New",
    imageFile: null,
    features: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleFeatureChange = (feature) => {
    setCar((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleFileChange = (e) => {
    setCar({ ...car, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!car.imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", car.title);
      formData.append("bodyType", car.bodyType || "");
      formData.append("model", car.model);
      formData.append("year", Number(car.year));
      formData.append("fuelType", car.fuelType || "");
      formData.append("price", Number(car.price));
      formData.append("mileage", Number(car.mileage) || 0);
      formData.append("engineCapacity", Number(car.engineCapacity) || 0);
      formData.append("description", car.description || "");
      formData.append("condition", car.condition || "");
      formData.append("exteriorColor", car.exteriorColor || "");
      formData.append("features", JSON.stringify(car.features));
      formData.append("image", car.imageFile);

      const res = await fetch("http://localhost:8080/api/cars/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) throw new Error(JSON.stringify(data));

      alert("Car uploaded successfully!");
      navigate("/used-cars");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="sell-layout">
      <Navbar />
      <div className="sell-page">
        <form className="sell-form" onSubmit={handleSubmit}>
          {/* LEFT */}
          <div className="sell-left">
            <h2>Sell Your Car</h2>
            <p className="breadcrumb">Homepage - Sell</p>
            <div className="sell-images">
              <img src={sellimage} alt="car" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="sell-right">
            <section>
              <h3>Car Details</h3>
              <div className="row">
                <input
                  name="title"
                  placeholder="Title"
                  value={car.title}
                  onChange={handleChange}
                  required
                />
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="condition"
                      value="New"
                      checked={car.condition === "New"}
                      onChange={handleChange}
                    />
                    New
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="condition"
                      value="Used"
                      checked={car.condition === "Used"}
                      onChange={handleChange}
                    />
                    Used
                  </label>
                </div>
              </div>

              <div className="row">
                <input
                  name="bodyType"
                  placeholder="Body Type"
                  value={car.bodyType}
                  onChange={handleChange}
                />
                <input
                  name="model"
                  placeholder="Model"
                  value={car.model}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <input
                  name="year"
                  placeholder="Year"
                  value={car.year}
                  onChange={handleChange}
                  required
                />
                <input
                  name="exteriorColor"
                  placeholder="Exterior Color"
                  value={car.exteriorColor}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={car.description}
                onChange={handleChange}
              />
            </section>

            <section>
              <h3>Engine Details</h3>
              <div className="row">
                <input
                  name="fuelType"
                  placeholder="Fuel Type"
                  value={car.fuelType}
                  onChange={handleChange}
                />
                <input
                  name="mileage"
                  placeholder="Mileage"
                  value={car.mileage}
                  onChange={handleChange}
                />
                <input
                  name="engineCapacity"
                  placeholder="Engine Capacity"
                  value={car.engineCapacity}
                  onChange={handleChange}
                />
              </div>
            </section>

            <section>
              <h3>Features</h3>
              <div className="features-grid">
                {[
                  "Power Steering",
                  "Bluetooth",
                  "USB Port",
                  "Spacious",
                  "AC",
                  "Wifi",
                  "Alarm",
                  "Other",
                  "Roof Rack",
                  "Sunroof",
                  "Airbags",
                ].map((f) => (
                  <label className="feature-item" key={f}>
                    <input
                      type="checkbox"
                      checked={car.features.includes(f)}
                      onChange={() => handleFeatureChange(f)}
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </section>

           <section>
  <h3>Price</h3>
  <input
    type="range"
    name="price"
    min="200000"
    max="5000000"
    step="50000"
    value={car.price}
    onChange={handleChange}
  />
  <p>Selected Price: ₹{car.price}</p>
</section>


            <section>
              <h3>Images & Video</h3>
              <div className="image-upload-box">
                <label htmlFor="imageUpload" className="upload-label">
                  <div className="upload-plus">+</div>
                  <span>Upload your image</span>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  required
                  hidden
                  onChange={handleFileChange}
                />
              </div>
              {car.imageFile && (
                <img
                  src={URL.createObjectURL(car.imageFile)}
                  alt="Preview"
                  className="image-preview"
                />
              )}
            </section>

            <button type="submit" className="submit-btn">
              Sell My Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
