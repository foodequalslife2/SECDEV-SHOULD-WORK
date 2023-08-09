const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	postID: {
		type: String, // posterID + userPostNum for easier tracking
		required: true
	},

	posterID: {
		type: Number,
		required: true
	},

	userPostNum: {
		type: Number,
		required: true
	},

	username: {
		type: String,
		required: true
	},

	type: {	// Content type i.e. image, video, audio.
		type: String,
		required: true
	},

	contentPath: { // Path to img of the post
		type: String, 
		required: true
	},

	description: {
		type: String,
		required: true
	},

	isDeleted: {
        type: Boolean,
        required: true
    },

	likes: [Number],

	tags: [String]
});

var post = mongoose.model('Post', PostSchema);

module.exports = post;