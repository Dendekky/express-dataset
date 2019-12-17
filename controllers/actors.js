const inventoryDB = require('./events').inventoryDB;


function newTest (test) {
	test.sort(function(a, b) {
		if(new Date(a.created_at).getTime() === new Date(b.created_at).getTime()) {
			test.sort((a, b) =>  {
			if(a.author.login < b.author.login) { return -1; }
			if(a.author.login > b.author.login) { return 1; }
			return 0});
		} else {
			test.sort((a, b) =>  new Date(b.created_at).getTime() - new Date(a.created_at).getTime() )
		}
	}).map(info => info.actor)
}

const getAllActors = (req, res) => {
	inventoryDB.find({}, function(err, data) {
		console.log("sending all actors");
		if (err) res.status(404).send(err);
		else res.status(200).send(newTest(data))
			// .sort((a, b) =>  b.createdAt.getTime() - a.createdAt.getTime() ).map(info => info.actor));
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

const getStreak = (req, res) => {
	inventoryDB.find({}, function(err, data) {
		function sortStreak(allTypesArray) {
			var map = allTypesArray.reduce(function (p, c) {
				p[c] = (p[c] || 0) + 1;
				return p;
			}, {});
			var newTypesArray = Object.keys(map).sort(function (a, b) {
				return map[a] < map[b];
			});
		}

		console.log("sending all actors");
		if (err) res.status(404).send(err);
		else res.status(200).send(sortStreak(data))
			// data.sort((a, b) =>  new Date(b.created_at).getTime() - new Date(a.created_at).getTime() ).map(info => info.actor));
	});
};


module.exports = {
	updateActor,
	getAllActors,
	getStreak,
};

















