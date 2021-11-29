import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import Notification from './components/Notification';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const createBlogRef = useRef();

  useEffect(() => {
    if (user !== null) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON); //convert JSON string to JS object
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = (blogObject) => {
    createBlogRef.current.toggleVisibility();
    blogService.create(blogObject).then((result) => {
      setBlogs(blogs.concat({ ...result, user: { username: user.username } }));
    });
    setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added.`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)); // convert user to JSON string

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser(null);
      blogService.setToken('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} messageClass='error' />
          <Login
            username={username}
            password={password}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={message} messageClass='notification' />
          <UserDetails user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel='new blog' ref={createBlogRef}>
            <CreateBlog createBlog={createBlog} />
          </Togglable>
          <div className='blogs'>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  user={user}
                  key={blog.id}
                  blog={blog}
                  handleLikes={handleLikes}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
