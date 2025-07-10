const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Handle driver status updates
  socket.on('driver-status-change', (data) => {
    // Broadcast to relevant parties (passengers, admin, etc.)
    io.emit('driver-status-updated', data);
  });
  
  // Handle booking acceptance
  socket.on('accept-booking', (data) => {
    // Process booking acceptance
    io.emit('booking-accepted', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
