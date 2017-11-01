const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
const authCheck = require('../middleware/authCheck');

router.post('/polls', authCheck, apiController.createPoll);

module.exports = router;