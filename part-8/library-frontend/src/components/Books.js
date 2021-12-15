import React, { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/libraryQueries';

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState({ value: '', label: '' });
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const bookGenres = new Set();
  books.map((b) => b.genres.map((g) => bookGenres.add(g)));
  const genres = [...bookGenres];

  const options = [{ value: '', label: 'all genres' }].concat(
    genres.map((g) => ({ value: g, label: g }))
  );
  const filteredBooks =
    selectedGenre.value === ''
      ? books
      : books.filter((b) => b.genres.includes(selectedGenre.value));

  return (
    <div>
      <h2>books</h2>
      filter by genres{' '}
      <Select
        defaultValue={selectedGenre}
        onChange={setSelectedGenre}
        options={options}
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
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

export default Books;
