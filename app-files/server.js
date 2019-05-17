const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/api/users');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/LocalOpenHouse')
  .then(() => {
    console.log('MongoDB successfully connected');
    app.listen(port, () =>
      console.log(`The server is up and running on port ${port} !`)
    );
  })
  .catch(err => {
    console.log(err);
  });
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);
