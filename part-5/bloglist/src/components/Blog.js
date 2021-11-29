import React, { useState } from 'react';

const Blog = ({ user, blog, handleLikes, handleDelete }) => {
  const [display, setDisplay] = useState('none');
  const [likes, setLikes] = useState(blog.likes);
  const [buttonLabel, setButtonLabel] = useState('view');
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const displayStyle = {
    display: display,
  };

  const handleDisplay = () => {
    if (display === 'none') {
      setDisplay('');
      setButtonLabel('hide');
    }
    if (display === '') {
      setDisplay('none');
      setButtonLabel('view');
    }
  };

  const updateLikes = () => {
    const blogObject = { ...blog, likes: likes + 1 };
    handleLikes(blog.id, blogObject);
    setLikes(likes + 1);
  };

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      handleDelete(blog.id);
  };

  return (
    <div style={blogStyle} className='blog'>
      <span>
        {blog.title} - {blog.author}
      </span>{' '}
      <button onClick={handleDisplay}>{buttonLabel}</button>
      <div className='blog-details' style={displayStyle}>
        <p>{blog.url}</p>
        <p>
          <span>likes: {likes}</span>{' '}
          <button id='like' onClick={updateLikes}>
            like
          </button>
        </p>
        <p>{blog.author}</p>
        {user.username === blog.user.username && (
          <button id='remove' onClick={remove}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
