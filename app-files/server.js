const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('mongoose');

const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

const users = require('./routes/api/users');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

// Connect to MongoDB
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
