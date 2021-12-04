import React from 'react';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const NewComment = ({ blog }) => {
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    const data = { comment: event.target.comment.value };
    event.target.comment.value = '';

    dispatch(commentBlog(blog, data));
    dispatch(setNotification(`you commented on '${blog.title}'`, 5000));
  };

  return (
    <div>
      <form onSubmit={handleComment}>
        <input name='comment' required />
        <button className='btn btn-primary' id='create'>
          add comment
        </button>
      </form>
    </div>
  );
};

export default NewComment;
