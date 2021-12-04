import blogService from '../services/blogs';

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'NEW_BLOG',
      data: { ...newBlog },
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    });
  };
};

export const commentBlog = (blog, data) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(blog, data);
    dispatch({
      type: 'COMMENT',
      data: commentedBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: 'REMOVE',
      data: blog,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data);
    case 'LIKE':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    case 'COMMENT':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    case 'REMOVE':
      return state.filter((blog) => blog.id !== action.data.id);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;
