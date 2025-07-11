// Shared database functions
const DB = {
  getDrivers: () => JSON.parse(localStorage.getItem('angkasDrivers')) || [],
  getBookings: () => JSON.parse(localStorage.getItem('angkasBookings')) || [],
  saveDrivers: (drivers) => localStorage.setItem('angkasDrivers', JSON.stringify(drivers)),
  saveBookings: (bookings) => localStorage.setItem('angkasBookings', JSON.stringify(bookings)),
  
  init: function() {
    if (!localStorage.getItem('angkasDrivers')) {
      this.saveDrivers([
        { id: 'driver1', name: 'Juan Dela Cruz', vehicle: 'Honda Beat', status: 'available', location: null },
        { id: 'driver2', name: 'Pedro Santos', vehicle: 'Yamaha Mio', status: 'available', location: null },
        { id: 'driver3', name: 'Maria Reyes', vehicle: 'Suzuki Skydrive', status: 'available', location: null }
      ]);
    }
    if (!localStorage.getItem('angkasBookings')) {
      this.saveBookings([]);
    }
  }
};

// Initialize map
function initMap(center = [14.5995, 120.9842], zoom = 13) {
  const map = L.map('map').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  return map;
}

// Show status message
function showStatus(message, type = 'info') {
  const statusEl = document.getElementById('status') || document.createElement('div');
  statusEl.id = 'status';
  statusEl.textContent = message;
  statusEl.style.display = 'block';
  statusEl.style.position = 'absolute';
  statusEl.style.bottom = '80px';
  statusEl.style.left = '20px';
  statusEl.style.zIndex = '1000';
  statusEl.style.background = type === 'error' ? 'rgba(239, 68, 68, 0.8)' : 
                            type === 'success' ? 'rgba(34, 197, 94, 0.8)' : 
                            'rgba(0, 0, 0, 0.7)';
  statusEl.style.color = 'white';
  statusEl.style.padding = '8px 12px';
  statusEl.style.borderRadius = '6px';
  statusEl.style.maxWidth = '80%';
  
  if (!document.getElementById('status')) {
    document.body.appendChild(statusEl);
  }
  
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 5000);
}

// Initialize the database
DB.init();
