const authResolver = require('./auth');
const eventsResolver = require('./jobs');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;
