const express = require('express');
const router = express.Router();
const isEmail = require('validator/lib/isEmail');
const passport = require('passport');

router.post('/signup', (req, res, next) => {
  // Server side form validation
  let { name, email, password } = req.body;
  name     = name.trim();
  email    = email.trim();
  password = password.trim();

  let message = { success: false };
  if (name.length < 3) message.name = 'Please provide a valid name';
  if (!isEmail(email)) message.email = 'Please provide a valid email';
  if (password.length < 6) message.password = 'The password must be atleast 6 chars'
  
  // TODO: Change the status code of the response
  // if any of these is true send message
  if (message.name || message.email || message.password) {
    res.send(message);
    return;
  } 

  return passport.authenticate('local-signup', (err, user) => {

    // TODO: Add error for duplicate email
    if (err) {
      res.send({ error: err.message }).end();
      return;
    }
    res.send({ success: true }).end()

  }) (req, res, next) // passport.authenticate

})

router.post('/login', (req, res, next) => {
  // Server side form validation
  let { email } = req.body;
  email = email.trim();
  if (!isEmail(email)) {
    // TODO: Set the error status code
    res.send({ success: false, error: 'Invalid Email' }).end();
    return;
  }

  return passport.authenticate('local-login', (err, token, user) => {
    if (err) {
      // TODO: Set the error status code
      res.send({ success: false, error: err.message }).end()
      return;
    }
    const response = {
      token,
      user : {
        _id: user._id,
        name: user.name,
        email: user.email 
      }
    }
    res.send(response);
  }) (req, res, next) // passport.authenticate
})

module.exports = router;