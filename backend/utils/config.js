require('dotenv').config();

const CALLBACK_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_CALLBACK_URL
    : process.env.PROD_CALLBACK_URL;
const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_URL
    : process.env.PROD_URL;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = process.env.PORT;

module.exports = {
  CALLBACK_URL,
  CLIENT_URL,
  MONGODB_URI,
  PORT,
};
