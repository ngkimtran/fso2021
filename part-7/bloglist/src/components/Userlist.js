import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Userlist = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users && (
        <Table striped>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users
              .sort((u1, u2) => u2.blogs.length - u1.blogs.length)
              .map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Userlist;
