const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  stem: String,
  options: [{
    option: String,
    votes: {
      type: Number,
      default: 0
    }
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  votedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  votedIp: [String]
});

module.exports = mongoose.model('poll', pollSchema);