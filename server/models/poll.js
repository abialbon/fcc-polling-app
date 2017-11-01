const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  stem: String,
  options: [[String]],
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