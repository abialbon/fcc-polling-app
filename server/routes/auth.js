const express = require('express');
const router = express.Router();
const isEmail = require('validator/lib/isEmail');

router.post('/signup', (req, res) => {

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
  } 

})

module.exports = router;