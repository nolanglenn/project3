const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  compensation: {
    type: Number,
    required: true
  },
  geocodeLng: {
    type: Number,
    required: true
  },
  geocodeLat: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Job', jobSchema);
