const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const Tabs = require('../models/TabsModel.js');

const tabsController = {
	getTabs: function (req,res) {
		try{
			var username = req.session.username;

			req.session.referral = '/tabs';

			res.render('tabs', {username});
		}
		
		catch(error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
	},

	getTabsURL: function (req, res) {
		try {
			var URL = req.params.URL
			var username = req.session.username;

			req.session.referral = '/tabs/'+URL;

			res.render(URL, {username});
		}
		catch(error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
		
	},

	getTabsFeed: function (req, res) {
		var query = 'SELECT * from `tab`'

		db.query(query)
		.then((result) => {
			if (result != null) {
				res.send(result);
			}
		})
		.catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });
	}
}

module.exports = tabsController;