import axios from 'axios';
const baseUrl = '/auth';

const login = async (credentials) => {
  console.log('logging in', credentials);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const register = async (credentials) => {
  console.log('registering', credentials);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login, register };
