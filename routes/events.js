var express = require('express');
var router = express.Router();
const eventController = require('../controllers/events');

// Routes related to event
router.get('/', eventController.getAllEvents);

router.post('/', eventController.addEvent);

router.get('/erase', eventController.eraseEvents);

router.get('/actors/:id', eventController.getByActor);

module.exports = router;