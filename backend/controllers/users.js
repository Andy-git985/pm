const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.post('/register', async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    firstName,
    lastName,
    displayName: `${firstName} ${lastName}`,
    email,
    provider: null,
    providerId: null,
    passwordHash,
  });
  await newUser.save();

  const userForToken = {
    displayName: newUser.displayName,
    id: newUser._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  response.cookie('jwt', token);
  response.status(201).redirect(config.CLIENT_URL);
});

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });
  const passwordCorrect =
    existingUser === null
      ? false
      : await bcrypt.compare(password, existingUser.passwordHash);

  if (!(existingUser && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    displayName: existingUser.displayName,
    id: existingUser._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  response.cookie('jwt', token);
  response.status(200).redirect(config.CLIENT_URL);
});

module.exports = usersRouter;
