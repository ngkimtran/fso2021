import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <>
      {user && (
        <div>
          <div class='jumbotron text-center'>
            <h2>{user.name}</h2>
          </div>
          <h5>added blogs</h5>
          <ul className='list-group'>
            {user.blogs.map((b) => (
              <li className='list-group-item' key={b.id}>
                {b.title}
              </li>
            ))}
          </ul>
          <button className='btn btn-light'>
            <Link to='/users'>back</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default User;
