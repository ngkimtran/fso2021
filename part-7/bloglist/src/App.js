import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import Blog from './components/Blog';
import Notification from './components/Notification';
import Bloglist from './components/Bloglist';
import NavigationBar from './components/NavigationBar';
import Userlist from './components/Userlist';
import User from './components/User';

import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { login, logout, loadUser } from './reducers/userReducer';
import { getUsers } from './reducers/usersReducer';

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogMatch = useMatch('/blogs/:id');
  const userMatch = useMatch('/users/:id');

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
      dispatch(getUsers());
    }
  }, [user, dispatch]);

  const users = useSelector(({ users }) => users);
  const clickedUser =
    userMatch && users ? users.find((u) => u.id === userMatch.params.id) : null;
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    event.target.username.value = '';
    event.target.password.value = '';
    try {
      dispatch(login({ username, password }));
      dispatch(setNotification(`${username} welcome back!`, 5000));
    } catch (exception) {
      dispatch(setNotification(`wrong username/password`, 5000));
    }
  };

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`you liked '${blog.title}'`, 5000));
    if (user !== null) dispatch(initializeBlogs());
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      dispatch(setNotification(`you deleted '${blog.title}'`, 5000));
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div className='container'>
        <h2>login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control type='text' name='username' />
            <Form.Label>password</Form.Label>
            <Form.Control type='password' name='password' />
            <button className='btn btn-primary' type='submit'>
              login
            </button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  return (
    <div className='container'>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blog={blog}
              user={user}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          }
        />
        <Route path='/users/:id' element={<User user={clickedUser} />} />
        <Route path='/users' element={<Userlist users={users} />} />
        <Route
          path='/'
          element={
            <Bloglist
              blogFormRef={blogFormRef}
              blogs={blogs}
              user={user}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
