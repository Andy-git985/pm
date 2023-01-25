import axios from 'axios';
import jwtService from './jwt';

const baseUrl = '/api/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const removeNote = async (id) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { getAll, createNew, removeNote };
