const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

// Database connection
const dbConnection = require('./server/models/dbConnection');
dbConnection.connect(process.env.db_URL);

// Static resources
app.use(express.static(path.join(__dirname, '/server/static')))
app.use(express.static(path.join(__dirname, '/client/dist')))

// Body-parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport configuration
app.use(passport.initialize());
const signupStrategy = require('./server/passport/local-signup');
const loginStrategy = require('./server/passport/local-login');
passport.use('local-signup', signupStrategy);
passport.use('local-login', loginStrategy);

// Routes setup
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server/static/index.html'));
})


app.listen(process.env.PORT || 3000, process.env.IP || '127.0.0.1', () => {
  console.log('The server has started!');
});

module.exports = app;