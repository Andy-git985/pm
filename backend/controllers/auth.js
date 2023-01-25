const authRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

authRouter.get('/google', (request, response) => {
  response.status(200).json({ url: config.CALLBACK_URL });
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'scope'] })
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
