const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  imageURL: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  broker: {
    type: String
    // required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  password: {
    type: String,
    required: true
  },
  createdJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
