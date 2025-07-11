const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');


// --- MongoDB Integration ---
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/calamba_rides', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  passengerName: String,
  pickup: String,
  dropoff: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

const app = express();
const server = http.createServer(app);

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Socket.IO setup
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New driver connected:', socket.id);

  // Handle driver status updates
  socket.on('driver-status-change', (data) => {
    io.emit('driver-status-updated', data);
  });

  // Handle booking acceptance
  socket.on('accept-booking', (data) => {
    io.emit('booking-accepted', data);
  });

  socket.on('disconnect', () => {
    console.log('Driver disconnected:', socket.id);
  });
});

// Existing API routes
app.use('/api', require('./routes/driverRoutes')); // Example

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


  socket.on('bookingRequest', (data) => {
    console.log('New booking request received:', data);
    // Broadcast to all connected drivers/admins
    socket.broadcast.emit('newBooking', data);
  });