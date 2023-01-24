import axios from 'axios';
const baseUrl = '/user';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAccountInfo = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/account`, config);
  return response.data;
};

const getLoginUrl = async () => {
  const response = await axios.get('/auth/google/');
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
  const response = await axios.post(`${baseUrl}/login`, credentials);
  setToken(response.data.token);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  setToken(response.data.token);
  return response.data;
};

export default {
  getAccountInfo,
  getLoginUrl,
  getToken,
  login,
  register,
  setToken,
};
