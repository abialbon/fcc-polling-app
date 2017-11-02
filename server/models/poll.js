const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

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

pollSchema.pre('remove', function(next) {
  User.findByIdAndUpdate(this.author,
    { $pull: { polls: this._id }})
    .then(() => next())
})

module.exports = mongoose.model('poll', pollSchema);