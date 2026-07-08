const express = require('express');
const aiController = require('../controllers/ai.controller');

const router = express.Router();

router.post('/ensemble', aiController.processPrompt);

module.exports = router;
