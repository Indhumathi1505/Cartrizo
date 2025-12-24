import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./CarDetails.css";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCar();
  }, [id]);

  const handleBack = () => navigate("/used-cars");
  const toggleFavourite = () => setIsFavourite(!isFavourite);

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="loading">Error: {error.message}</div>;
  if (!car) return <div className="loading">Car not found!</div>;

  return (
    <div className="cardetails-page">
      <button className="back-btn" onClick={handleBack}>
        &larr; Back to Used Cars
      </button>

      <div className="cardetails-card">
        <div className="image-container">
          <img
            src={car.image ? `data:image/jpeg;base64,${car.image}` : "/placeholder-car.jpg"}
            alt={car.title}
            onError={(e) => { e.target.src = "/placeholder-car.jpg"; }}
          />
          <button className="favourite-btn" onClick={toggleFavourite}>
            {isFavourite ? <FaHeart color="#ff4d4f" /> : <FaRegHeart color="#0af" />}
          </button>
        </div>

        <div className="car-info">
          <h1>{car.title}</h1>
          <div className="price">₹{Number(car.price).toLocaleString()}</div>

          <div className="details">
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Fuel:</strong> {car.fuelType}</p>
            <p><strong>Mileage:</strong> {car.mileage} km</p>
            <p><strong>Engine:</strong> {car.engine} CC</p>
            <p><strong>Color:</strong> {car.exteriorColor}</p>
            <p><strong>Condition:</strong> {car.condition}</p>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>

          <div className="features">
            <h3>Features</h3>
            <div className="feature-list">
              {car.features && car.features.length > 0
                ? car.features.map((f, idx) => (
                    <span key={idx} className="feature-item">{f}</span>
                  ))
                : <p>No features listed</p>
              }
            </div>
          </div>

         <div className="dealer-info-form">
  <h3>Dealer Info</h3>
  <div className="form-group">
    <label>Name</label>
    <input type="text" value={car.dealerName} readOnly />
  </div>
  <div className="form-group">
    <label>Phone</label>
    <input type="text" value={car.dealerPhone} readOnly />
  </div>
  <div className="form-group">
    <label>Email</label>
    <input type="text" value={car.dealerEmail} readOnly />
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
