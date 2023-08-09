const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const Tabs = require('../models/TabsModel.js');

const tabsController = {
	getTabs: function (req,res) {
		var username = req.session.username;

		req.session.referral = '/tabs';

		res.render('tabs', {username});
	},

	getTabsURL: function (req, res) {
		var URL = req.params.URL
		var username = req.session.username;

		req.session.referral = '/tabs/'+URL;

		res.render(URL, {username});
	},

	getTabsFeed: function (req, res) {
		var query = 'SELECT * from `tab`'

		db.query(query).then((result) => {
			if (result != null) {
				res.send(result);
			}
		});
	}
}

module.exports = tabsController;