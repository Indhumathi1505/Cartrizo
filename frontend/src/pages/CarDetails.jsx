import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaPhoneAlt, FaComments } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./CarDetails.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  const [reviews, setReviews] = useState([
    { username: "Alice", rating: 5, comment: "Excellent car!" },
    { username: "Bob", rating: 4, comment: "Very smooth drive." }
  ]);

  const [newReview, setNewReview] = useState({
    username: "",
    rating: 5,
    comment: ""
  });

  const [selectedImage, setSelectedImage] = useState("");

  /* FETCH CAR */
  useEffect(() => {
    axios.get(`http://localhost:8080/api/cars/${id}`)
      .then(res => {
        setCar(res.data);
        setSelectedImage(res.data.images?.[0] || res.data.image);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* FAVOURITE */
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favs.some(c => c.id === id));
  }, [id]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    if (isFavourite) {
      localStorage.setItem("favourites", JSON.stringify(favs.filter(c => c.id !== car.id)));
      setIsFavourite(false);
    } else {
      favs.push(car);
      localStorage.setItem("favourites", JSON.stringify(favs));
      setIsFavourite(true);
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    setReviews([newReview, ...reviews]);
    setNewReview({ username: "", rating: 5, comment: "" });
  };

  /* PIE */
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach(r => counts[r.rating - 1]++);
  const pieData = {
    labels: ["1★", "2★", "3★", "4★", "5★"],
    datasets: [{ data: counts }]
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!car) return <div className="loading">Car not found</div>;

  return (
    <div className="cardetails-page">

      <button className="back-btn" onClick={() => navigate("/used-cars")}>
        ← Back
      </button>

      {/* IMAGE GALLERY */}
      <div className="image-section">
        <img
          className="main-image"
          src={`data:image/jpeg;base64,${selectedImage}`}
          alt="car"
        />

        <div className="thumbnail-row">
          {(car.images || [car.image]).map((img, i) => (
            <img
              key={i}
              src={`data:image/jpeg;base64,${img}`}
              className={selectedImage === img ? "thumb active" : "thumb"}
              onClick={() => setSelectedImage(img)}
              alt="thumb"
            />
          ))}
        </div>

        <button className="favourite-btn" onClick={toggleFavourite}>
          {isFavourite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* DETAILS */}
      <div className="details-section">
        <h1>{car.title}</h1>
        <div className="price">₹{Number(car.price).toLocaleString()}</div>

        {/* SPEC TABLE */}
        <table className="spec-table">
          <tbody>
            <tr><th>Model</th><td>{car.model}</td></tr>
            <tr><th>Year</th><td>{car.year}</td></tr>
            <tr><th>Mileage</th><td>{car.mileage} km</td></tr>
            <tr><th>Engine</th><td>{car.engine} CC</td></tr>
            <tr><th>Fuel</th><td>{car.fuelType}</td></tr>
            <tr><th>Color</th><td>{car.exteriorColor}</td></tr>
            <tr><th>Condition</th><td>{car.condition}</td></tr>
          </tbody>
        </table>

        {/* DESCRIPTION */}
        <div className="description">
          <h3>Description</h3>
          <p>{car.description}</p>
        </div>

        {/* FEATURES */}
        <div className="features">
          <h3>Features</h3>
          <div className="feature-list">
            {car.features?.map((f, i) => (
              <span key={i} className="feature-item">{f}</span>
            ))}
          </div>
        </div>

        {/* DEALER */}
        <div className="dealer-box">
          <h3>Dealer Info</h3>
          <input value={car.dealerName} readOnly />
          <input value={car.dealerPhone} readOnly />
          <input value={car.dealerEmail} readOnly />
        </div>

        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          <button className="contact-btn">
            <FaPhoneAlt /> Contact Dealer
          </button>

          <button className="chat-btn">
            <FaComments /> Chat with Owner
          </button>
        </div>
      </div>

      {/* SUBMIT REVIEW */}
      <div className="submit-review">
        <h3>Submit Review</h3>
        <form onSubmit={submitReview}>
          <input
            placeholder="Username"
            value={newReview.username}
            onChange={e => setNewReview({ ...newReview, username: e.target.value })}
            required
          />

          <div className="star-input">
            {[1,2,3,4,5].map(s => (
              <span
                key={s}
                className={s <= newReview.rating ? "star filled" : "star"}
                onClick={() => setNewReview({ ...newReview, rating: s })}
              >★</span>
            ))}
          </div>

          <textarea
            placeholder="Comment"
            value={newReview.comment}
            onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* REVIEWS */}
      <div className="reviews-section">
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <b>{r.username}</b>
            <div className="review-stars">
              {[1,2,3,4,5].map(s => (
                <span key={s} className={s <= r.rating ? "star filled" : "star"}>★</span>
              ))}
            </div>
            <p>{r.comment}</p>
          </div>
        ))}

        <div className="pie-chart">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
