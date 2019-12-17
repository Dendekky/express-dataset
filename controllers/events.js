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
  filename: "./model/events.db",
  autoload: true,
//   timestampData: true
});

// GET inventory

const getAllEvents = (req, res) => {
	inventoryDB.find({}, function(err, data) {
		if (err) res.status(404).send(err);
		else {
			console.log("sending all events");
			res.status(200).send(data.sort((a, b) =>  a.id - b.id ).pop() );
		}
	})
};

const addEvent = (req, res) => {
	var eventObject = req.body;
	
	const event = {
		id: eventObject.id,
		type: eventObject.type,
		actor: {
			id: eventObject.actor.id,
			login: eventObject.actor.login,
			avatar_url: eventObject.actor.avatar_url
		},
		repo: {
			id: eventObject.repo.id,
			name: eventObject.repo.name,
			url: eventObject.repo.url
		},
		created_at: eventObject.created_at,
		updated_at: eventObject.updated_at
	}

	inventoryDB.insert(event, function(err, data) {
		if (err) res.status(500).send(err);
		else res.status(201).send(data);
		});
};


const getByActor = (req, res) => {
		// if (!req.params.actorId) {
		//   res.status(404).send("No such actor.");
		// } else {
		  inventoryDB.find({ "actor.id": req.params.id }, function(err, data) {
			  if (err) res.status(404).send(err);
			//   else {
			// 	  if (data.length < 1) res.status(404).send('no actor');
				  else{
					res.status(200).send(
						data.sort((a, b) =>  a.id - b.id ).actor
						)
				}
			//   }
		  })
		// }
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

















