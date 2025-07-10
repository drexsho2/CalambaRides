import React, { useState, useEffect } from 'react';
import { notification, Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { socket } from '../utils/socketio';
import notificationSound from '../assets/notification.mp3';

const BookingNotification = () => {
  const [audio] = useState(new Audio(notificationSound));
  
  useEffect(() => {
    const handleNewBooking = (booking) => {
      // Play sound
      audio.play();
      
      notification.open({
        message: 'New Booking Request',
        description: `New ride request from ${booking.pickupLocation}`,
        icon: <SoundOutlined style={{ color: '#108ee9' }} />,
        btn: (
          <Button 
            type="primary" 
            onClick={() => {
              // Handle booking acceptance
              socket.emit('accept-booking', { bookingId: booking._id });
              notification.close(booking._id);
            }}
          >
            Accept
          </Button>
        ),
        key: booking._id,
        duration: 0, // Don't auto-close
      });
    };

    socket.on('new-booking', handleNewBooking);

    return () => {
      socket.off('new-booking', handleNewBooking);
    };
  }, [audio]);

  return null; // This is a hidden component
};

export default BookingNotification;
