const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  stem: String,
  options: [{
    option: String,
    votes: {
      type: Number,
      default: 0
    }
  }],
  votedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  votedIp: [String]
});

module.exports = mongoose.model('poll', pollSchema);