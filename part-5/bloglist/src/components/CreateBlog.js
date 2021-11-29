import React, { useState } from 'react';

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h4>create a new blog</h4>
      <form id='blog-form' onSubmit={handleCreateBlog}>
        <table style={{ textAlign: 'left' }}>
          <tbody>
            <tr>
              <th>title</th>
              <td>
                <input
                  id='title'
                  type='text'
                  value={title}
                  name='Title'
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>author</th>
              <td>
                <input
                  id='author'
                  type='text'
                  value={author}
                  name='Author'
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>url</th>
              <td>
                <input
                  id='url'
                  type='text'
                  value={url}
                  name='Url'
                  onChange={({ target }) => setUrl(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateBlog;
