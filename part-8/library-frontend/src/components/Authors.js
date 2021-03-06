import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries/libraryQueries';
import EditBirthYear from './EditBirthYear';

const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <EditBirthYear authors={authors} />}
    </div>
  );
};

export default Authors;
