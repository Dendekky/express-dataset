const inventoryDB = require('./events').inventoryDB;

const getAllActors = (req, res) => {
	inventoryDB.find({}, function(err, data) {
		console.log("sending all actors");
		if (err) res.status(404).send(err);
		else res.status(200).send(data.sort((a, b) =>  b.createdAt.getTime() - a.createdAt.getTime() ).map(info => info.actor));
	})
};


const updateActor = (req, res) => {
	const{ id, avatar_url } = req.body;
	inventoryDB.update({ 
		"actor._id": id }, 
		{ $set: { "actor.avatar_url": avatar_url } }, 
		{ multi: true, returnUpdatedDocs: true }, 
		function(err, affectedDocuments) {
		if (err) res.sendStatus(404).send(err);
		else res.sendStatus(200).send(affectedDocuments);
	});

};

const getStreak = () => {

};


module.exports = {
	updateActor,
	getAllActors,
	getStreak,
};

















