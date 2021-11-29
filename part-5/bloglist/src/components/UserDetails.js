import React from 'react';

const style = {
  display: 'inline-block',
};

const UserDetails = ({ user, handleLogout }) => {
  return (
    <div>
      <p style={style}>{user.name} logged in</p>{' '}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserDetails;
