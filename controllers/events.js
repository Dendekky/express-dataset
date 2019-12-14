var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
var Datastore = require("nedb");
const uuidv1 = require('uuid/v1');

// var async = require("async");
app.use(bodyParser.json());
// module.exports = app;
// Creates Database
var inventoryDB = new Datastore({
  filename: "../model/eventewer.db",
  autoload: true
});

// GET inventory

const getAllEvents = (req, res) => {
	inventoryDB.find({}, function(err, data) {
		console.log("sending all events");
		res.status(200).send(data);
	})
};

const addEvent = (req, res) => {
	var eventObject = req.body;
	
	const event = {
		type: eventObject.type,
		actor: {
			_id: uuidv1(),
			login: eventObject.actor.login,
			avatar_url: eventObject.actor.avatar_url
		},
		repo: {
			_id: uuidv1(),
			name: eventObject.repo.name,
			url: eventObject.repo.url
		}
	}

	inventoryDB.insert(event, function(err, data) {
		if (err) res.status(500).send(err);
		else res.status(201).send(data);
		});
};


const getByActor = (req, res) => {
		if (!req.params.actorId) {
		  res.status(404).send("No such actor.");
		} else {
		  inventoryDB.find({ "actor._id": req.params.actorId }, function(err, data) {
			  if (err) res.status(404).send(err);
			  else {
				res.status(200).send(
					data.sort((a, b) =>  a._id - b._id )
					)
			  }
		  })
		}
};


const eraseEvents = (req, res) => {
	inventoryDB.remove({}, { multi: true }, function(err, numDeleted) {
		if (err) res.status(500).send(err);
		else {
			res.status(200).send({})
		console.log('Deleted', numDeleted, 'event(s)')
		}
   });
};

module.exports = {
	getAllEvents,
	addEvent,
	getByActor,
	eraseEvents,
	inventoryDB
};

















