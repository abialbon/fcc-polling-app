const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, cb)
}

userSchema.pre('save', function(next) {
  bcrypt.genSalt((saltErr, salt) => {
    bcrypt.hash(this.password, salt, (hashErr, hash) => {
      this.password = hash;
      next();
    })
  })
})



module.exports = mongoose.model('user', userSchema);