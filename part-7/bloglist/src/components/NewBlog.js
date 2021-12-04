import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form } from 'react-bootstrap';

const NewBlog = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const handleNewBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    dispatch(createBlog({ title, author, url }));
    dispatch(setNotification(`you created '${title}' by ${author}`, 5000));
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control type='text' name='author' />
          <Form.Label>title</Form.Label>
          <Form.Control type='text' name='title' />
          <Form.Label>url</Form.Label>
          <Form.Control type='text' name='url' />
          <button className='btn btn-primary' type='submit'>
            create
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewBlog;
