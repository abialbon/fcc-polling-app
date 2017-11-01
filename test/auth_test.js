const app = require('../index');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const User = mongoose.model('user');

describe('POST /signup', () => {
  it('sends an error if name is invalid', (done) => {
    request(app)
      .post('/auth/signup')
      .send('name=d')
      .send('email=demo@test.com')
      .send('password=testpass')
      .end((err, res) => {
        if(err) return done(err);
        assert(res.body.success === false)
        done();
      })
  })

  it('sends an error if email is invalid', (done) => {
    request(app)
      .post('/auth/signup')
      .send('name=demouser')
      .send('email=demotest.com')
      .send('password=testpass')
      .end((err, res) => {
        if(err) return done(err);
        assert(res.body.success === false)
        done();
      })
  })

  it('sends an error if password is short', (done) => {
    request(app)
      .post('/auth/signup')
      .send('name=demouser')
      .send('email=demo@test.com')
      .send('password=test')
      .end((err, res) => {
        if(err) return done(err);
        assert(res.body.success === false)
        done();
      })
  })

  it('saves the user details in the db', (done) =>{
    request(app)
    .post('/auth/signup')
    .send('name=demouser')
    .send('email=demo@test.com')
    .send('password=testtest')
    .end((err, res) => {
      User.findOne({ name: 'demouser' })
        .then(user => {
          assert(user.email === 'demo@test.com')
          done();
        })
        .catch(err => done(err))
      // console.log(res.body);
    })
  })
})

describe('POST /auth/login', () => {
  before(done => {
    request(app)
      .post('/auth/signup')
      .send('email=login@app.com')
      .send('name=test')
      .send('password=testtest')
      .end((err, res) => {
        if (err) return done(err);
        done();
      })
  })

  it('returns an error if the email is invalid', (done) => {
    request(app)
      .post('/auth/login')
      .send('email=loginapp.com')
      .send('password=testtest')
      .end((err, res) => {
        assert(res.body.success === false);
        done();
      })
  })

  it('returns an error if password is wrong', (done) => {
    request(app)
      .post('/auth/login')
      .send('email=login@app.com')
      .send('password=test')
      .end((err, res) => {
        assert(res.body.success === false);
        done();
      })
  })

  it('returns a token when logged in', (done) => {
    request(app)
      .post('/auth/login')
      .send('email=login@app.com')
      .send('password=testtest')
      .end((err, res) => {
        assert(typeof res.body.token === 'string');
        done();
      })
  })

})