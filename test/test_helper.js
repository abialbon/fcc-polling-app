const mongoose = require('mongoose');

before(done => {
  mongoose.connection
    .once('open', () => done())
    .on('error', err => done(err))
})

after(done => {
  const { users } = mongoose.connection.collections;
  users.drop()
    .then(() => done()) 
})