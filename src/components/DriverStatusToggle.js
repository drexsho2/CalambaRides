import React, { useState, useEffect } from 'react';
import { Switch, Typography } from 'antd';
import { updateDriverStatus } from '../services/driverService';
import { socket } from '../utils/socketio';

const { Text } = Typography;

const DriverStatusToggle = ({ driverId }) => {
  const [isOnline, setIsOnline] = useState(false);

  const handleStatusChange = async (checked) => {
    try {
      await updateDriverStatus(driverId, checked ? 'online' : 'offline');
      setIsOnline(checked);
      // Emit socket event
      socket.emit('driver-status-change', { driverId, status: checked ? 'online' : 'offline' });
    } catch (error) {
      console.error('Error updating driver status:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Text strong>Status:</Text>
      <Switch 
        checked={isOnline}
        onChange={handleStatusChange}
        checkedChildren="Online"
        unCheckedChildren="Offline"
      />
    </div>
  );
};

export default DriverStatusToggle;
