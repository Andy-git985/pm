const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const passportSetup = require('./utils/passport');
const passport = require('passport');
const authRouter = require('./controllers/auth');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');

logger.info('connecting to', config.MONGODB_URI);
mongoose.set('strictQuery', false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(passport.initialize());
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use(middleware.tokenExtractor);
app.use('/api/notes', middleware.userExtractor, notesRouter);
app.use('/api/notes', notesRouter);

module.exports = app;
