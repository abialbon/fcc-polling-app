const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

// Database connection
const dbConnection = require('./server/models/dbConnection');
dbConnection.connect('mongodb://abialbon:a3s4d5@ds143245.mlab.com:43245/pollace')

// Static resources
app.use(express.static(path.join(__dirname, '/server/static')))
app.use(express.static(path.join(__dirname, '/client/dist')))

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Passport configuration
app.use(passport.initialize());
const signupStrategy = require('./server/passport/local-signup');
passport.use('local-signup', signupStrategy);

//Routes setup
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

app.listen(3000, '127.0.0.1', () => {
  console.log('The server has started!');
});

module.exports = app;