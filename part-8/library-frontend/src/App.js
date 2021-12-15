import React, { useState, useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';
import { BOOK_ADDED, ALL_BOOKS } from './queries/libraryQueries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const prevToken = localStorage.getItem('library-user-token');
    if (prevToken) {
      setToken(prevToken);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <Notify errorMessage={errorMessage} />

      {page === 'authors' && <Authors token={token} />}
      {page === 'books' && <Books />}
      {page === 'add' && (
        <NewBook setError={notify} updateCacheWith={updateCacheWith} />
      )}
      {page === 'login' && (
        <LoginForm
          setPage={setPage}
          show={page === 'login'}
          setToken={setToken}
          setErrorMessage={notify}
        />
      )}
      {page === 'recommend' && <Recommend />}
    </div>
  );
};

export default App;
