import axios from 'axios';

const baseUrl = '/api/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

export default { getAll, createNew };
