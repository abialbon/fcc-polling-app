const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
const authCheck = require('../middleware/authCheck');

router.post('/polls', authCheck, apiController.createPoll);
router.post('/polls/:id', authCheck, apiController.votePoll);
router.put('/polls/:id', authCheck, apiController.addOption);
router.delete('/polls/:id', authCheck, apiController.deletePoll);

module.exports = router;