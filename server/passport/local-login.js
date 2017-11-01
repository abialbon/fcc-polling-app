const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const loginCallback = (email, password, done) => {
  email = email.trim();
  password = password.trim();

  const invalidError = new Error('Incorrect email or password')

  User.findOne({ email })
    .then((user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) { 
          done(invalidError);
        }
        jwt.sign({ id: user._id }, secret, { expiresIn: '3d' }, (err, token) => {
          done(null, token, user)
        });
      })
    })
    .catch(err => {
      console.log(err);
      done(invalidError);
    })
}

module.exports = new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: false
}, loginCallback)