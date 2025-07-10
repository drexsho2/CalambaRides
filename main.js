if (currentUserRole === 'customer') {
  document.getElementById('booking-panel').innerHTML = `
    <h2><i class="material-icons">directions_bike</i> Book a Ride</h2>
    <form id="booking-form">
      <div class="form-group">
        <label for="pickup">Pickup Location</label>
        <input type="text" id="pickup" placeholder="Enter pickup address" required>
      </div>
      <div class="form-group">
        <label for="destination">Destination</label>
        <input type="text" id="destination" placeholder="Enter destination" required>
      </div>
      <div class="form-group">
        <label for="vehicle-type">Vehicle Type</label>
        <select id="vehicle-type">
          <option value="standard">Standard Motorcycle</option>
          <option value="premium">Premium Motorcycle</option>
        </select>
      </div>
      <div id="fare-display">Estimated Fare: ₱0.00</div>
      <button type="submit" id="book-btn">
        <i class="material-icons">directions_bike</i>
        <span>Book Now</span>
      </button>
    </form>
  `;
  // Also need to do: add listeners for booking-form, etc
}
