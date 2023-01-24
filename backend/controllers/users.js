const bcrypt = require('bcrypt');
const config = require('../utils/config');
const usersRouter = require('express').Router();
const User = require('../models/User');
const jwtToken = require('../utils/jwtToken');

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

  const token = jwtToken.create(newUser);

  response.cookie('jwt', token, { sameSite: 'lax' });
  response.status(201).send({ token, newUser });
});

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const token = jwtToken.create(user);

  response.cookie('jwt', token, { sameSite: 'lax' });
  response.status(201).send({ token, user });
});

usersRouter.get('/account', async (request, response) => {
  const user = await User.findById(request.user);
  response.status(200).json(user);
});

usersRouter.put('/account/email', async (request, response) => {
  const user = await User.findById(request.user);
  const { oldEmail, newEmail } = request.body;
  // if oldEmail === user.email
  // user.email = newEmail
  // else error old email is incorrect
});

usersRouter.put('/account/password', async (request, response) => {
  const user = await User.findById(request.user);
  const { oldPassword, newPassword } = request.body;
  const passwordCorrect = user
    ? await bcrypt.compare(oldPassword, user.passwordHash)
    : false;
  if (passwordCorrect) {
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    user.passwordHash = newPasswordHash;
    await user.save();
    // response.status().json(user)
  } else {
    // error oldPassword incorrect
  }
});

usersRouter.delete('/account', async (request, response) => {});

module.exports = usersRouter;
