const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    numPosts: {
        type: Number,
        required: true
    },
    
    avatar: {
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        required: true
    },

    followers: [Number],

    liked: [String]
});

var user = mongoose.model('User', UserSchema);

module.exports = user;