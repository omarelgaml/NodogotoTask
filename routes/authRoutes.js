const passport = require ('passport');
const mongoose = require ('mongoose');
const requireLogin = require ('../middlewares/requireLogin');

const User = mongoose.model ('users');
module.exports = app => {
  app.put ('/api/updateUser', requireLogin, async (req, res) => {
    const newUser = req.body.user;

    newUser.type = req.body.type;
    const user = await User.findByIdAndUpdate (newUser._id, newUser);
    res.send (user);
  });

  app.get (
    '/auth/google',
    passport.authenticate ('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get (
    '/auth/google/callback',
    passport.authenticate ('google'),
    (req, res) => {
      res.redirect ('/home');
    }
  );
  app.get ('/api/current_user', (req, res) => {
    res.send (req.user);
  });
  app.get ('/api/logout', (req, res) => {
    req.logout ();
    res.redirect ('/');
  });
};
