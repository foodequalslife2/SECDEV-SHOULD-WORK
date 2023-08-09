const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const Logger = require('../controllers/logController.js');

const commentController = {
	// Gets the Commenting page
	getComment: function (req, res) {
		var postID = req.params.postID;
		var sessionname = req.session.username;

		req.session.referral = '/comment/'+postID;

		details = {
			postID: postID,
			sessionname: sessionname
		}

		res.render('comment', details);
	},

	getPost: function (req, res) {
		var postID = req.query.postID;

		var query = 'SELECT * from `post` WHERE postID = ' + postID + ';';
		
		db.query(query).then((result) => {
			if (result != null) {
				res.send(result[0]);
			} 
		});
	},

	getPostComments: function (req, res) {
		var postID = req.query.postID;

		var query = 'SELECT * from `comment` WHERE postID = ' + postID + ';';

		db.query(query).then((result) => {
			if (result != null) {
				res.send(result);
			}
		});
	},

	postComment: function (req, res) {
		var postID = req.body.formPostID;

		var username = req.session.username;

		var projection = 'userID username';

		var query = 'SELECT * from `user` where username = "' + username + '";';

		db.query(query).then((result) => {
			if (result != null) {
				console.log('User found: ' + result[0].username);
				console.log('Commenter ID: ' + result[0].userID);
				console.log('Post ID: ' + postID);

				var commenterID = result[0].userID;
				var commentsNum = req.body.commentsNum;
				commentsNum++;
				console.log(commentsNum);
				var commentID = commenterID+postID+commentsNum;

				var comment = {
					commentID: commentID,
					commenterID: commenterID,
					postID: postID,
					username: req.session.username,
					content: req.body.commentAreaContent,
					isDeleted: 0
				}

				var query = "INSERT INTO `comment` (commentID, commenterID, postID, username, content, isDeleted) values ('" +  comment.commentID + "', '" +  comment.commenterID + "', '" +  comment.postID + "', '" +  comment.username + "', '" +  comment.content + "', '" +  comment.isDeleted + "');";

				Logger.logAction('Commented on ' + comment.postID, comment.username);

				db.query(query).then((result) => {
					if (result != null) {
						console.log('Added Comment: '+commentID);
						res.redirect('/back');
					}
				});
			}
		});
	},

	deleteComment: function (req, res) {
		var postID = req.params.postID;
		var username = req.session.username;
		var commentID = req.params.commentID;

		var query = 'DELETE from `comment` WHERE postID = ' + postID + ' AND commentID = ' + commentID + ';'; 

		Logger.logAction('Deleted ' + commentID + ' On post ' + postID, username);

		db.query(query).then((result) => {
			if (result != null) {
				res.send(true);
			}
		});

		// db.deleteOne(Comments, query, function (result) {
		// 	if (result)
		// 		res.send(true);
		// });
	}
}

module.exports = commentController;