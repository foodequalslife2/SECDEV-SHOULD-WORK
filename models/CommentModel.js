const mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	commentID: { // CommenterID + Post ID 
		type: String,
		required: true
	},

	commenterID: { // UserID
		type: Number,
		required: true
	},

	commentNum: {
		type: Number, // Denotes the comment seen from top to bottom in a post
		required: true
	},

	postID: {
		type: String,
		required: true
	},

	username: {
		type: String,
		required: true
	},

	content: {
		type: String,
		required: true
	}, 

	isDeleted: {
        type: Boolean,
        required: true
    }
});

var comment = mongoose.model('Comment', CommentSchema);

module.exports = comment;