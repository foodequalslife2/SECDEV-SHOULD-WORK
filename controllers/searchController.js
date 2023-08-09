const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const Tabs = require('../models/TabsModel.js');
const path = require('path');
const util = require('util');
const clone = require('clone');

const searchController = {
	getSearch: function (req, res) {
		var sessionname = req.session.username;

		details = {
			sessionname: sessionname,
		}

		req.session.referral = '/sessionname';

		res.render('search', details);
	},

	getResults: function (req, res) {
		var type = req.query.type;
		var searchQuery = req.query.query;
		console.log("Type: "+type)
		console.log("Query: "+searchQuery);

		// Search Posts
		if (type == 'post') {
			var query = 'SELECT * from `post` WHERE description = "' + searchQuery + '" OR username = "' + searchQuery + '" AND isDeleted = 0;';

			db.query(query).then((results) => {
				res.send(results);
			});
		}

		// Search Users
		if (type == 'user') {
			var query = 'SELECT * from `user` WHERE username = "' + searchQuery + '" AND isDeleted = 0;';

			db.query(query).then((results) => {
				res.send(results);
			});
		}

		// Search Comments
		if (type == 'comment') {
			var query = 'SELECT * from `comment` WHERE username = "' + searchQuery + '" OR content = "' + searchQuery + '" AND isDeleted = 0;';

			db.query(query).then((results) => {
				res.send(results);
			});
		}

		// Search Tabs
		if (type == 'tabs') {
			var query = 'SELECT * from `tab` WHERE tabsName = "' + searchQuery + '" OR tabsInstrument = "' + searchQuery + '";';

			db.query(query).then((results) => {
				res.send(results);
			});
		}
	}
}

module.exports  = searchController;