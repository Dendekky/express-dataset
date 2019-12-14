var express = require('express');
var router = express.Router();
const actorController = require('../controllers/actors');
 
// Routes related to actor.
router.get('/', actorController.getAllActors)
router.put('/',  actorController.updateActor)

module.exports = router;