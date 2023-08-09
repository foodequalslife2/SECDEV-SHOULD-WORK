const express = require('express');
const fileupload = require('express-fileupload');
const controller = require('../controllers/controller.js')
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
const successController = require('../controllers/successController.js');
const profileController = require('../controllers/profileController.js');
const tunerController = require('../controllers/tunerController.js');
const tabsController = require('../controllers/tabsController.js');
const metronomeController = require('../controllers/metronomeController.js');
const logoutController = require('../controllers/logoutController.js');
const postController = require('../controllers/postController.js');
const commentController = require('../controllers/commentController.js');
const searchController = require('../controllers/searchController.js');
const adminController = require('../controllers/adminController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getSession);

app.get('/logout', logoutController.getLogout);

app.get('/signup', signupController.getSignUp);
app.post('/postSignUp', signupController.postSignUp);
app.get('/getCheckUsername', signupController.getCheckUsername);
app.get('/getCheckPassword', signupController.getCheckPassword);

app.post('/postLogin', loginController.postLogin);
app.get('/getPassword', loginController.getPassword);

app.get('/success', successController.getSuccess);

app.get('/profile/:username', profileController.getProfile);
app.get('/getProfileAvatar/:username', profileController.getProfileAvatar);
app.get('/editprofile/:username', profileController.getEditProfile);
app.post('/postProfileInfo', profileController.postProfileInfo);
app.get('/changepassword/:username', profileController.getChangePassword);
app.post('/postChangePassword', profileController.postChangePassword);
app.get('/uploadPage/:username', profileController.getUploadPage);
app.post('/upload', profileController.upload);
app.post('/deleteAccount/:username/:userID', profileController.deleteAccount); 
app.get('/viewposts/:username', postController.getViewUserPosts);
app.post('/follow/:username', profileController.followAccount); /////////////////////
app.get('/getFollowers/:username', profileController.getFollowers);//////////////////

app.get('/feed', postController.getFeed);
app.get('/feed/:username', postController.getFeed);//////////////////////////////////
app.get('/getNormalPosts', postController.getNormalPosts);
app.get('/getUserPosts', postController.getUserPosts);
app.post('/postLike/:postID', postController.postLike);//////////////////////////////
app.get('/makePost/:username', postController.getMakePostPage);//////////////////////
app.post('/uploadPost', postController.uploadPost);
app.post('/deletePost/:postID', postController.deletePost);//////////////////////////

app.get('/comment/:postID', commentController.getComment);///////////////////////////
app.get('/getPost', commentController.getPost);
app.get('/getPostComments', commentController.getPostComments);
app.post('/postComment', commentController.postComment);
app.post('/deleteComment/:postID/:commentID', commentController.deleteComment);//////

app.get('/userlist', adminController.getUserList);
app.get('/logrecords', adminController.getLogRecords); 
app.post('/saveLogs', adminController.saveLogRecords);

app.get('/search', searchController.getSearch);
app.get('/getResults', searchController.getResults);

app.get('/login', loginController.getLogin)

app.get('/tuner', tunerController.getTuner);

app.get('/tabs', tabsController.getTabs);
app.get('/getTabsFeed', tabsController.getTabsFeed);

// BEGIN TABS

app.get('/tabs/:URL', tabsController.getTabsURL);

// END TABS

app.get('/metronome', metronomeController.getMetro);

app.get('/back', controller.getBack);

app.get('/adminpanel', adminController.getAdminPage);

module.exports = app;
