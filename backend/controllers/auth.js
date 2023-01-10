const authRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const User = require('../models/User.js');

// authRouter.post(
//   '/register',
//   passport.authenticate('jwt', { session: false }),
//   function (req, res) {
//     console.log('request', req.body);
//     res.send(req.user.profile);
//   }
// );

// authRouter.post('/register', async (request, response) => {
//   const { firstName, lastName, email } = request.body;
//   const user = new User({
//     firstName,
//     lastName,
//     displayName: `${firstName} ${lastName}`,
//     email,
//     provider: null,
//     providerId: null,
//     passwordHash: null,
//   });
//   await user.save();
//   response.status(200).json({ message: 'registered' });
// });

authRouter.post('/login', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

authRouter.get('/google/login', (request, response) => {
  response.status(200).json({ url: config.CALLBACK_URL });
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google'),
  (request, response) => {
    const user = {
      id: request.user.id,
      displayName: request.user.displayName,
    };
    const token = jwt.sign(
      {
        user,
      },
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    );
    response.cookie('jwt', token);
    response.status(200).redirect(config.CLIENT_URL);
  }
);

module.exports = authRouter;
