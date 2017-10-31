const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true  
  },
  polls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'poll'
  }]
});

module.exports = mongoose.model('user', userSchema);