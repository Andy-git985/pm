import axios from 'axios';
import jwtService from './jwt';

const baseUrl = '/user';

const getAccountInfo = async () => {
  const token = jwtService.getToken();
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

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};

export default {
  getAccountInfo,
  getLoginUrl,
  login,
  register,
};
