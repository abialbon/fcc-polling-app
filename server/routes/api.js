const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
const authCheck = require('../middleware/authCheck');

router.get('/polls', apiController.getAllPolls);
router.get('/polls/:id', apiController.showAPoll);
router.get('/validate', authCheck, (req, res) => {
  res.send({ success: true, user: { _id: req.userid, name: req.username } });
})

router.get('/polls/user/:user', authCheck, apiController.showUserPolls);
router.post('/polls', authCheck, apiController.createPoll);
router.post('/polls/:id', authCheck, apiController.votePoll);
router.put('/polls/:id', authCheck, apiController.addOption);
router.delete('/polls/:id', authCheck, apiController.deletePoll);

module.exports = router;