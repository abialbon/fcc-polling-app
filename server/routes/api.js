const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
const authCheck = require('../middleware/authCheck');
const voteMiddleware = require('../middleware/voteMiddleware');

router.get('/polls', apiController.getAllPolls);
router.get('/polls/:id', apiController.showAPoll);

router.get('/validate', authCheck, (req, res) => {
  res.send({ success: true, user: { _id: req.userid, name: req.username } });
})

router.get('/getIP', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  res.send({ ip: ip })
})

router.get('/polls/user/:user', authCheck, apiController.showUserPolls);
router.post('/polls', authCheck, apiController.createPoll);
router.post('/polls/:id', voteMiddleware, apiController.votePoll);
router.put('/polls/:id', authCheck, apiController.addOption);
router.delete('/polls/:id', authCheck, apiController.deletePoll);

module.exports = router;