const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/api/users');
const path = require('path');
require('dotenv').config(); // For Heroku deployment

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
/// Testing Heroku ///
app.use(express.static(path.join(__dirname, "client", "build")))

// DB Config

const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/LocalOpenHouse')
  .then(() => {
    console.log('MongoDB successfully connected');
    /// Heroku Testing ///
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
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
