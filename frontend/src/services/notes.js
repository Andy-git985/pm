import axios from 'axios';

const baseUrl = '/api/notes';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('services', token, content);

  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

export default { setToken, getAll, createNew };
