const mongoose = require('mongoose');
const Poll = mongoose.model('poll');

const createPoll = (req, res) => {
  // get the options from the request
  let options = Object.keys(req.body);
  const i = options.indexOf('stem');
  options.splice(i, 1);
  const pollOptions = [];
  for (let i = 0; i < options.length; i++) {
    pollOptions[i] = [req.body[options[i]], 0]
  }
  const newPoll = new Poll({
    stem: req.body.stem,
    options: pollOptions,
    author: req.userid
  });
  console.log(pollOptions);

  newPoll.save()
    .then(() => res.send({ success: true }))
    .catch(err => res.send({ success: false, error: err.name }))
}

module.exports = {
  createPoll
};