import axios from 'axios';
import storage from '../utils/storage';

const baseUrl = '/api/blogs';

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig());
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig());
  return response.data;
};

const comment = async (blog, comment) => {
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    comment,
    getConfig()
  );
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { getAll, create, update, comment, remove };
