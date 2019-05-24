const Event = require('../../models/job');
const User = require('../../models/user');

const { transformEvent, singleEvent } = require('./merge');

module.exports = {
  selectedJob: async (args, req) => {
    console.log('This is ID#1: ', req.body.variables.jobId);
    try {
      const job = await Event.find({ _id: req.body.variables.jobId });
      console.log(job[0]);

      return job[0];
    } catch (err) {
      console.log(err);

      throw err;
    }
  },
  jobs: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        console.log(event);

        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createJob: async (args, req) => {
    console.log(args);

    const event = new Event({
      title: args.jobInput.title,
      notes: args.jobInput.notes,
      address: args.jobInput.address,
      geocodeLat: args.jobInput.geocodeLat,
      geocodeLng: args.jobInput.geocodeLng,
      jobType: args.jobInput.jobType,
      compensation: +args.jobInput.compensation,
      date: new Date(args.jobInput.date),
      creator: args.jobInput.creator
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(args.jobInput.creator);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdJobs.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
