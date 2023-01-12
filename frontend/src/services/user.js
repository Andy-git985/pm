import axios from 'axios';
const baseUrl = '/user';

const getLoginUrl = async () => {
  const response = await axios.get('/auth/login');
  return response.data.url;
};

const getToken = (key) => {
  let value = '';
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1];
    }
  });
  return value;
};

const login = async (credentials) => {
  console.log('logging in', credentials);
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const register = async (credentials) => {
  console.log('registering', credentials);
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};

export default { getLoginUrl, getToken, login, register };
