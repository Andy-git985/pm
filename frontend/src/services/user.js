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

const remove = async () => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/account`, config);
  return response.status;
};

const updateEmail = async (data) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/account/email`, data, config);
  return response.data;
};

const updatePassword = async (data) => {
  const token = jwtService.getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/account/password`, data, config);
  return response.data;
};

export default {
  getAccountInfo,
  getLoginUrl,
  login,
  register,
  remove,
  updateEmail,
  updatePassword,
};
