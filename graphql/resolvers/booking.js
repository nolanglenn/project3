const Event = require('../../models/job');
const Booking = require('../../models/booking');
const { transformBooking, transformEvent } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    let userId = req.headers.user;

    try {
      const bookings = await Booking.find({ user: userId });

      if (!bookings) {
        return null;
      }
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookJob: async (args, req) => {
    const fetchedEvent = await Event.findOne({ _id: args.jobId });
    const booking = new Booking({
      count: req.body.variables.count,
      user: req.headers.user,
      event: fetchedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
