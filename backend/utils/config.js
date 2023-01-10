require('dotenv').config();

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_URL
    : process.env.PROD_URL;
const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  CLIENT_URL,
  PORT,
  MONGODB_URI,
};
