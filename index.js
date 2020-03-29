const express = require ('express');
const cookieSession = require ('cookie-session');
const passport = require ('passport');
const mongoose = require ('mongoose');
const keys = require ('./config/keys');
require ('./models/User');
require ('./services/passport');

mongoose.connect (keys.mongoURI);
const app = express ();

app.use (
  cookieSession ({
    maxAge: 30 * 24 * 60 * 60 * 100,
    keys: [keys.cookieKey],
  })
);
app.use (passport.initialize ());
app.use (passport.session ());
require ('./routes/authRoutes') (app);


if (process.env.NODE_ENV === 'production') {
  //express will serve up the index.html file
  //ilike our main.js file, or main.css file

  app.use (express.static ('client/build'));

  //express will serve up the index.html file
  // if it does not recognize the route
  app.get ('*', (req, res) => {
    res.sendFile (path.resolve (__dirname, 'client', 'build', 'index.html'));
  });
}



const PORT = process.env.PORT || 5000;
app.listen (PORT);

//git repo
//https://git.heroku.com/rocky-beyond-10909.git


//ExweX8IWrquAiPKL
//mongodb+srv://omar:ExweX8IWrquAiPKL@quarantinebuddy-mhnn9.mongodb.net/test?retryWrites=true&w=majority


//id: 964933078698-a9d2g4e17ns8o34rm0eavd8f0qqdubpi.apps.googleusercontent.com
//secret : 2YcqyEOjbWliUYUwM9YT6X_G