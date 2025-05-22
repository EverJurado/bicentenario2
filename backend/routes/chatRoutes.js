const express = require('express');
const router = express.Router();
const { getRespuestaChat } = require('../controllers/chatController');

router.post('/chat', getRespuestaChat);

module.exports = router;
