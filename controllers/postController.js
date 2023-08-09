const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const path = require('path');
const util = require('util');
const clone = require('clone');
const Logger = require('../controllers/logController.js');

const postController = {
	getFeed: function (req,res) {
		try{
			var sessionname = req.session.username;
			var feedname = req.params.username;

			details = {
				sessionname: sessionname,
				feedname: feedname
			}

			req.session.referral = '/feed';

			res.render('feed', details);
		}
		catch(error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
		
	},

	// THIS ONE DOESN'T WORK but it's not broken either 
	getViewUserPosts: function (req, res) {
		var sessionname = req.session.username;
		var feedname = req.params.username;

		details = {
			sessionname: sessionname,
			feedname: feedname
		}

		var query = 'SELECT * from `user` WHERE username = "' + feedname + '";';

		db.query(query)
			.then((result) => {
				if (result.length > 0 || result != null || typeof result[0] !== 'undefined') {
					req.session.referral = '/viewposts/'+feedname;

					res.render('viewposts', details);
				}
				else{
					var msg = 'Profile cannot be found.';
					res.render('error', {msg});
				}
			})
			.catch((error) => {
				if(req.session.username == 'admin') { var msg = {error: error.stack }; }
				else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
				res.render('error', msg);
			});
	},

	getNormalPosts: function (req, res) {
		var query = 'SELECT * from `post`'
		
		db.query(query)
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });
	},

	uploadPost: async function (req, res) {
        try {
        	const username = req.body.hiddenUsername;
        	const type = req.body.content_type;
            const file = req.files.file;
            const fileName = file.name;
            const size = file.data.length;
            const extension = path.extname(fileName);
            const toBeDeleted = req.body.avatarPath;
            var postID = req.body.postID;
            var allowedExtensions;
            var URL;

            if (type == 'image')
            	allowedExtensions = /png|jpeg|jpg/;
            if (type == 'video')
            	allowedExtensions = /mp4|ogg|webm/;
            if (type == 'audio')
            	allowedExtensions = /mp3|wav|ogg/;

            console.log('Allowed Extensions: '+allowedExtensions);

            if (!allowedExtensions.test(extension)) throw "Unsupported extension";
            if (size > 12000000) throw "File must be less than 12MB";

            const md5 = file.md5;

            if (type == 'image')
            	URL = "/images/posts/"+postID+extension;
			if (type == 'video')
            	URL = "/videos/posts/"+postID+extension;
			if (type == 'audio')
            	URL = "/audio/posts/"+postID+extension;

            var contentPath = ".."+URL;

            await util.promisify(file.mv)("./dist"+URL);

            // Submit Post

            var posterID = req.body.userID;
            var userPostNum = req.body.postNum;
            userPostNum++;
            var description = req.body.description_area;

            var tags = req.body.tags;
			var tagsArray = tags.split(" ");

            var post = {
				postID: postID,
				posterID: posterID,
				userPostNum: userPostNum,
				username: username,
				type: type,
				contentPath: contentPath,
				description: description,
				likes: 0,
				tags: tagsArray,
				isDeleted: false
			}

			console.log('postID: '+postID);
			console.log('posterID: '+posterID);
			console.log('userPostNum: '+userPostNum);
			console.log('username: '+username);
			console.log('type: '+type);
			console.log('contentPath: '+contentPath);
			console.log('description: '+description);
			console.log('tags: '+tagsArray);

			var query = "INSERT INTO `post` (postID, posterID, username, type, contentPath, description, likes, isDeleted) values ('" + post.postID + "', '" + post.posterID + "', '" + post.username + "', '" + post.type + "', '" + post.contentPath + "', '" + post.description + "', '" + post.likes + "', '" + "0" + "');";

			Logger.logAction('Posted ' + post.postID , post.username);

			db.query(query)
				.then((result) => {
					if (result) {
						console.log('Post successfully added: '+result);

						res.redirect('/comment/'+post.postID);
					}
				
				})
				.catch((error) => {
					if(req.session.username == 'admin') { var msg = {error: error.stack }; }
					else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
					res.render('error', msg);
				});

        } catch (error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
    },

	getUserPosts: function (req, res) {
		var	username = req.query.feedname;

		var query = 'SELECT * from `post` WHERE username = "' + username + '";';

		db.query(query)
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });
	},

	getMakePostPage: function (req, res) {
		var sessionname = req.session.username;
		var feedname = req.params.username;

		var query = 'SELECT * from `user` WHERE username = "' + sessionname + '";';

		db.query(query)
		.then((result) => {
			if (result != null) {
				details = {
					userID: result[0].userID,
					sessionname: sessionname,
					feedname: feedname,
				}

				req.session.referral = '/makePost';

				res.render('makePost', details);
			} else {
				if(req.session.username == 'admin') { var msg = {error: error.stack }; }
				else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
				res.render('error', msg);
			}

		})
		.catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });
	},

	postLike: function (req, res) {
		var sessionuser = req.session.username;
		var postID = req.params.postID;

		var query = {
			username: sessionuser
		}

		var projection = 'userID';

		db.findOne(Users, query, projection, function (UserResult) {
			if (UserResult != null) {
				var userID = UserResult.userID;
				console.log('By User: ' + userID);

				query = {
					postID: postID
				}

				projection = 'postID likes';

				db.findOne(Posts, query, projection, function (PostResult) {
					var oldLikes = PostResult.likes;
					var newLikes = clone(oldLikes);

					var filter = {
						postID: PostResult.postID,
						likes: PostResult.likes
					}

					if (PostResult != null) {
						if (oldLikes.includes(userID)) {
							console.log('Already Liked by User');
							res.send(false);
						}
						else {
							newLikes.push(userID);

							var newInfo = {
								postID: postID,
								likes: newLikes
							}

							db.updateOne(Posts, filter, newInfo, function (result) {
								if (result) {
									console.log('Posted Like');
									res.send(true);
								}
							});
						}
					}
				});
			}
		});
	},


	deletePost: function (req, res) {
		var postID = req.params.postID;
		var username = req.session.username;
		var query = {
			postID: postID
		}
		console.log(postID);

		var query = 'DELETE from `post` WHERE postID = ' + postID + ';';

		Logger.logAction('Deleted post ' + postID, username);

		db.query(query)
		.then((result) => {
			if (result != null) {
				res.send(true);
			}
			else {
				if(req.session.username == 'admin') { var msg = {error: error.stack }; }
				else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
				res.render('error', msg);
			}
		})
		.catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });

		// db.deleteOne(Posts, query, function (result) {
		// 	if (result) {
		// 		db.deleteMany(Comments, query, function (result) {
		// 			var query = {
		// 				username: req.session.username
		// 			}

		// 			var projection = 'username numPosts';

		// 			db.findOne(Users, query, projection, function (result) {
		// 				if (result != null) {
		// 					var oldPostNum = result.numPosts;
		// 					var newPostNum = clone(oldPostNum);

		// 					var oldInfo = {
		// 						username: req.session.username,
		// 						numPosts: oldPostNum
		// 					}

		// 					newPostNum--;

		// 					var newInfo = {
		// 						username: req.session.username,
		// 						numPosts: newPostNum
		// 					}

		// 					db.updateOne(Users, oldInfo, newInfo, function (result) {
		// 						if (result)
		// 							res.send(true);
		// 					});
		// 				}
		// 			});
		// 		});
		// 	}
		// });
	}
}

module.exports  = postController;