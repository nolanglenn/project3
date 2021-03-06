const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/api/users');
const path = require('path');
require('dotenv').config(); // For Heroku deployment
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const axios = require('axios');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
/// Testing Heroku ///
app.use(express.static(path.join(__dirname, 'client', 'build')));

// DB Config

const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/LocalOpenHouse', {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB successfully connected');
    /// Heroku Testing ///
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
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


//TODO - KATIE: write api call here to process info from google geocode, then send back lat & lng
// app.use('/api/geocode', geoaddress);
//TODO - KATIE: write api call here to process info from google maps, then send back
app.get('/api/maps', (req, res) => {
  return res.json({mapURL: process.env.GOOGLE_MAPS_URL, geoCodeKey: process.env.GEO_CODE_KEY})
  
});


app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
