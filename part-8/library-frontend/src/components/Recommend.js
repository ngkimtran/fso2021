import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, RECOMMENDED_BOOKS } from '../queries/libraryQueries';

const Recommend = () => {
  const [books, setBooks] = useState(null);
  const userResult = useQuery(ME);
  const [getBooks, booksResult] = useLazyQuery(RECOMMENDED_BOOKS);

  useEffect(() => {
    if (userResult.data) {
      getBooks({ variables: { genres: userResult.data.me.favoriteGenre } });
    }
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [userResult.data, booksResult.data, getBooks]);

  if (!books) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{' '}
        <strong>{userResult.data.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
