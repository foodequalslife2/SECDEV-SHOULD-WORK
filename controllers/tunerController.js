const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');

const tunerController = {
	getTuner: function (req,res) {
		try {
			var username = req.session.username;

			req.session.referral = '/tuner';
			
			res.render('tuner', {username});
		}
		catch(error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
	}
}

module.exports = tunerController;