import React from 'react';
import { Link } from 'react-router-dom';
import NewComment from './NewComment';

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  return (
    <>
      {blog && (
        <div className='blog'>
          <div class='jumbotron text-center'>
            <h2>
              {blog.title} by {blog.author}{' '}
            </h2>
          </div>

          <div>
            <em>added by {blog.user.name}</em>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}{' '}
              <button
                className='btn btn-primary'
                onClick={() => handleLike(blog)}
              >
                <i className='fa fa-thumbs-up'></i>
              </button>
            </p>

            {user.name === blog.user.name && (
              <button
                className='btn btn-danger'
                onClick={() => handleRemove(blog)}
              >
                remove
              </button>
            )}
            <h4>comments</h4>
            <NewComment blog={blog} />
            <ul>
              {blog.comments.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <br />
        </div>
      )}
      <button className='btn btn-light'>
        <Link to='/'>back</Link>
      </button>
    </>
  );
};

export default Blog;
