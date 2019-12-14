const inventoryDB = require('./events').inventoryDB


const getAllActors = (req, res) => {
	inventoryDB.find({}, function(err, data) {
		console.log("sending all actors");
		if (err) res.status(404).send(err);
		else res.status(200).send(data.map(info => info.actor));
	})
};


const updateActor = (req, res) => {
	const{ id, avatar_url } = req.body;
	inventoryDB.update({ "actor._id": id }, { $set: { "actor.avatar_url": avatar_url } }, { multi: true }, function(err, data) {
		if (err) res.status(404).send(err);
		else res.status(200).send(data);
	});

};

const getStreak = () => {

};


module.exports = {
	updateActor,
	getAllActors,
	getStreak,
};

















