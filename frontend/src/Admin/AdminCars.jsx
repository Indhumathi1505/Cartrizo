import { useState } from "react";

const AdminCars = ({ cars, setCars }) => {
  const [car, setCar] = useState({
    title: "", condition: "New", bodyType: "", model: "", year: "2024",
    color: "", description: "", fuelType: "", mileage: "", capacity: "",
    price: "", stock: "", features: [], images: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updated = checked ? [...car.features, value] : car.features.filter(f => f !== value);
      setCar({ ...car, features: updated });
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files).map(f => URL.createObjectURL(f));
    setCar({ ...car, images: [...car.images, ...files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCars([...cars, { ...car, id: Date.now() }]);
    alert("Car Added Successfully!");
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <div className="form-section dark-card">
        <h4>Car Details</h4>
        <div className="form-grid">
          <div className="field full"><label>Title</label><input name="title" onChange={handleChange} /></div>
          <div className="field"><label>Body Type</label><input name="bodyType" onChange={handleChange} /></div>
          <div className="field"><label>Model</label><input name="model" onChange={handleChange} /></div>
          <div className="field"><label>Year</label><input type="number" name="year" onChange={handleChange} /></div>
          <div className="field"><label>Color</label><input name="color" onChange={handleChange} /></div>
          <div className="field full"><label>Description</label><textarea name="description" onChange={handleChange} rows="3" /></div>
        </div>
      </div>

      <div className="form-section dark-card">
        <h4>Engine & Price</h4>
        <div className="form-grid">
          <div className="field"><label>Fuel</label><input name="fuelType" onChange={handleChange} /></div>
          <div className="field"><label>Mileage</label><input name="mileage" onChange={handleChange} /></div>
          <div className="field"><label>Price ($)</label><input name="price" onChange={handleChange} /></div>
          <div className="field"><label>Stock</label><input name="stock" onChange={handleChange} /></div>
        </div>
      </div>

      <div className="form-section dark-card">
        <h4>Features</h4>
        <div className="features-grid">
          {["Powersteering", "AC", "Roof Rack", "Bluetooth", "Wifi", "Sunroof", "USB port", "Alarm", "Airbags", "Spacious"].map(f => (
            <label key={f} className="check-label"><input type="checkbox" value={f} onChange={handleChange} /> {f}</label>
          ))}
        </div>
      </div>

      <div className="form-section dark-card">
        <h4>Images & Video</h4>
        <div className="upload-box">
          <input type="file" id="file-in" multiple onChange={handleUpload} hidden />
          <label htmlFor="file-in" className="upload-btn">+</label>
          <div className="preview-row">
            {car.images.map((img, i) => <img key={i} src={img} className="mini-img" alt="preview" />)}
          </div>
        </div>
      </div>
      <button type="submit" className="add-btn">Add Car to Inventory</button>
    </form>
  );
};
export default AdminCars;