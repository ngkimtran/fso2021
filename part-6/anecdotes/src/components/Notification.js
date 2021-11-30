import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === null) return null;
  return <div style={style}>{notification}</div>;
};

export default Notification;
