import { useState } from "react";
import "./Admin.css";
import AdminCars from "./AdminCars";
import NewCars from "./NewCars";

export default function AdminDashboard() {

  const [cars, setCars] = useState([]);
  const [customers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", orders: "ORD-001" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9123456789", orders: "ORD-002" }
  ]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingCar, setEditingCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Search logic
  const filteredCars = cars.filter(car => 
    car.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteCar = (id) => {
    if (window.confirm("Delete this car?")) setCars(cars.filter(c => c.id !== id));
  };

  const startEdit = (car) => {
    setEditingCar(car);
    setActiveTab("cars");
  };

  return (
    <div className="admin-layout">
      {/* LEFT PANEL: SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Admin Panel</h2>
        </div>
        <nav className="nav-menu">
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button className={activeTab === "cars" ? "active" : ""} onClick={() => setActiveTab("cars")}>Cars</button>
          <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>Orders</button>
          <button className={activeTab === "customers" ? "active" : ""} onClick={() => setActiveTab("customers")}>Customers</button>
        </nav>
      </aside>

      {/* RIGHT PANEL: MAIN VIEWPORT */}
      <main className="main-viewport">
        <header className="page-header">
          <h1 className="main-title">Cartrizo Admin</h1>
          <div className="header-search">
            <input 
              type="text" 
              placeholder={`Search in ${activeTab}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="page-content">
          {/* DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className="dashboard-view">
              <section className="stats-container">
                <div className="stat-box blue">
                  <h4>Total Cars</h4>
                  <p className="stat-number">{cars.length}</p>
                </div>
                <div className="stat-box green">
                  <h4>Available</h4>
                  <p className="stat-number">{cars.filter(c => Number(c.stock) > 0).length}</p>
                </div>
                <div className="stat-box red">
                  <h4>Out of Stock</h4>
                  <p className="stat-number">{cars.filter(c => Number(c.stock) <= 0).length}</p>
                </div>
              </section>

              <section className="inventory-summary">
                <h3 className="inventory-title">Current Inventory Details</h3>
                <div className="summary-card">
                  <table>
                    <thead>
                      <tr>
                        <th>Car Name</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCars.map((car) => (
                        <tr key={car.id}>
                          <td><strong>{car.name}</strong></td>
                          <td>{car.model}</td>
                          <td>${Number(car.price).toLocaleString()}</td>
                          <td>
                            <span className={Number(car.stock) > 0 ? "status-yes" : "status-no"}>
                              {Number(car.stock) > 0 ? "Available" : "Out of Stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredCars.length === 0 && <p className="empty-msg">No inventory items found.</p>}
                </div>
              </section>
            </div>
          )}
{/* CARS VIEW */}
{activeTab === "cars" && (
  <div className="cars-view">
    {/* This section uses your original dark-card and grid styling */}
    <AdminCars 
      cars={cars} 
      setCars={setCars} 
      editingCar={editingCar} 
      setEditingCar={setEditingCar} 
    />
    <NewCars 
      cars={filteredCars} 
      deleteCar={deleteCar} 
      startEdit={startEdit} 
    />
  </div>
)}

          {/* CUSTOMERS VIEW */}
          {activeTab === "customers" && (
            <div className="customer-page">
              <div className="summary-card">
                <h3 className="card-title">Customer Directory</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Order Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.name}</strong></td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{c.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}