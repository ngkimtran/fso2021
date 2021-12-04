import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import Togglable from './Togglable';
import NewBlog from './NewBlog';

const Bloglist = ({ blogFormRef, blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
      <br />
      <Table striped>
        <tbody>
          {blogs
            .sort((b1, b2) => b2.likes - b1.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Bloglist;
