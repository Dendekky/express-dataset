var express = require('express');
var router = express.Router();
const eventController = require('../controllers/events');

// Route related to delete events

router.delete('/', eventController.eraseEvents);

module.exports = router;