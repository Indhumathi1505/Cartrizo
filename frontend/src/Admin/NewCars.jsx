const NewCars = ({ cars, deleteCar, startEdit }) => {
  return (
    <div className="inventory-table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>CAR</th>
            <th>MODEL</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <td>{index + 1}</td>
              <td>{car.name}</td>
              <td>{car.model || car.bodyType}</td>
              <td>${Number(car.price).toLocaleString()}</td>
              <td>{car.stock}</td>
              <td>
                <span className={car.stock > 0 ? "status-avail" : "status-out"}>
                  {car.stock > 0 ? "Available" : "Out of Stock"}
                </span>
              </td>
              <td>
                <button className="edit-action" onClick={() => startEdit(car)}>Edit</button>
                <button className="delete-action" onClick={() => deleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cars.length === 0 && <p className="no-cars">No cars available.</p>}
    </div>
  );
};

export default NewCars;