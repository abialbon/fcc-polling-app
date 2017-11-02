const mongoose = require('mongoose');
const Poll = mongoose.model('poll');
const User = mongoose.model('user');

const createPoll = (req, res) => {
  // get the options from the request
  let options = Object.keys(req.body);
  const i = options.indexOf('stem');
  options.splice(i, 1);
  const pollOptions = [];
  for (let i = 0; i < options.length; i++) {
    let newoption = {
      option: req.body[options[i]]
    }
    pollOptions.push(newoption);
  }
  const newPoll = new Poll({
    stem: req.body.stem,
    options: pollOptions,
    author: req.userid
  });

  newPoll.save()
    .then(poll => {
      User.findByIdAndUpdate(req.userid,
       { $push: { polls:  poll._id} })
        .then(() => res.send({ success: true }))
    })
    .catch(err => res.send({ success: false, error: err.name }))
}

const votePoll = (req, res) => {
  const pollID = req.params.id;
  Poll.findById(pollID)
    .then(poll => {
      if (!poll.votedUSers || poll.votedUSers.indexOf(req.userid) === -1) {
        Poll.update({ _id: pollID, "options._id": req.body.voteID },
            { $inc: {"options.$.votes": 1},
              $addToSet: { votedUsers: req.userid } },
            (err, poll) => {
              if (err) { res.send({ success: false, error: err.message }); return; }
              res.send({ success: true })
            }
          )
      } else {
        res.send({ success: false, error: 'You have already voted' })
      }
    })
    .catch(err => {
      res.send({ success: false, error: err.message })
    })
}

const deletePoll = (req, res) => {
  // TODO: Remove the poll id from the User model
  const pollID = req.params.id;
  Poll.findById(pollID)
    .then(poll => {
      poll.remove()
      .then(() => res.send({ success: true }))
      .catch(err => res.send({ success: false, error: err.message }))
    })
}

const addOption = (req, res) => {
  // Receives an option as req.body.option
  const pollID = req.params.id;
  const newOption = req.body.option;
  Poll.update({ _id: pollID },
    { $addToSet: { options: { option: newOption } } })
    .then(() => {
      res.send({ success: true }).end();
    })
    .catch(err => {
      res.send({ success: false, error: err.message }).end()
    })
}

module.exports = {
  createPoll,
  votePoll,
  addOption,
  deletePoll
};