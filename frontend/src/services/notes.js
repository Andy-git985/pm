import axios from 'axios';
import jwtService from './jwt';

const baseUrl = '/api/notes';
// const token = jwtService.getToken();
// const instance = axios.create({
//   baseURL: '/api/notes',
//   headers: { Authorization: token },
// });

const getAll = async () => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  // const response = await instance.get();
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createNew = async (content) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  // const response = await instance.post(content);
  const response = await axios.post(baseUrl, content, config);
  return response.data;
};
const updateNote = async (id, newObject) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const removeNote = async (id) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  // const response = await instance.delete(`/${id}`);
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { getAll, createNew, updateNote, removeNote };
