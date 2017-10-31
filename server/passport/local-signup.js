const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

const signupCallback = (req, email, password, done) => {
  const userData = {
    name: req.body.name.trim(),
    email: email.trim(),
    password: password.trim()
  }
  const newUser = new User(userData);
  newUser.save(userData)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => done(err))

}

module.exports = new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, signupCallback)