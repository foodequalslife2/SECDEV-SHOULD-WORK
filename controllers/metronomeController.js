const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');

const metronomeController = {
	getMetro: function (req,res) {
		try {
			req.session.referral = '/metronome';
			var username = req.session.username;
			res.render('metronome', {username});
		}
		catch(error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
	}
}

module.exports = metronomeController;