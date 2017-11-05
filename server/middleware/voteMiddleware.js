const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const mongoose = require('mongoose');
const User = mongoose.model('user');

const voteMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    req.userid = false;
    next();
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.send({ success: false, error: 'Your login has expired' })
      return;
    }
    const userId = decoded.id;
    User.findById(userId)
      .then(user => {
        req.userid = user._id;
        req.username = user.name;
        next();
      })
      .catch(err => {
        res.send({ success: false, error: 'User does not exist' }).end();
        return;
      })
  });
}

module.exports = voteMiddleware;
