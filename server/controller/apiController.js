const mongoose = require('mongoose');
const Poll = mongoose.model('poll');
const User = mongoose.model('user');

const getAllPolls = (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  Poll.find({})
    .skip(offset)
    .limit(20)
    .then(polls => res.send({ success: true, data: polls }))
    .catch(err => res.send({ success: false, error: err.message }))
}

const showUserPolls = (req, res) => {
  const userID = req.params.user;
  User.findById(userID)
    .populate('polls')
    .then(user => res.send({ success: true, data: user.polls }))
    .catch(err => res.send({ success: false, error: err.message }))
}

const showAPoll = (req, res) => {
  const pollID = req.params.id;
  Poll.findById(pollID)
    .then(poll => res.send({ success: true, data: poll }).end())
    .catch(err => res.send({ success: false, error: err.message }))
}

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
    author: req.userid,
    authorName: req.username
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
  if (req.userid) {
    Poll.findById(pollID)
    .then(poll => {
      if (!poll.votedUsers || poll.votedUsers.indexOf(req.userid) === -1) {
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
  } else { // If the user is not authenticated
    const userIP = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log(userIP);
    Poll.findById(pollID)
      .then(poll => {
        if (!poll.votedIp || poll.votedIp.indexOf(userIP) === -1) {
          Poll.update({ _id: pollID, "options._id": req.body.voteID },
          { $inc: {"options.$.votes": 1},
            $addToSet: { votedIp: userIP } },
            (err, poll) => {
              if(err) {
                // TODO: handle the error
                res.send({ success: false, error: err.message })
              } else {
                res.send({ success: true }).end();
              }
            }
          )
        } else {
          res.send({ success: false, error: 'The IP has already voted' }).end()
        }
      })
  }

}

const deletePoll = (req, res) => {
  const pollID = req.params.id;
  Poll.findById(pollID)
    .then(poll => {
      if (poll.author.equals(req.userid)) {
        poll.remove()
        .then(() => res.send({ success: true }))
        .catch(err => res.send({ success: false, error: err.message }))
      } else {
        res.send({ success: false, error: 'You do not have the permission to delete this' })
      }
    })
}

const addOption = (req, res) => {
  // Receives an option as req.body.option
  const pollID = req.params.id;
  const newOption = req.body.option;
  Poll.findById(pollID)
    .then(poll => {
      if (poll.author.equals(req.userid)) {
        Poll.update({ _id: pollID },
          { $addToSet: { options: { option: newOption } } })
          .then(() => {
            res.send({ success: true }).end();
          })
          .catch(err => {
            res.send({ success: false, error: err.message }).end()
          })
      } else {
        res.send({ success: false, error: 'You are not permitted to add options to this poll' })
      }
    })
}

module.exports = {
  getAllPolls,
  showUserPolls,
  showAPoll,
  createPoll,
  votePoll,
  addOption,
  deletePoll
};