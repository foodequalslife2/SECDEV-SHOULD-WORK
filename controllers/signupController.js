const db = require('../models/mysqldb.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const path = require('path');
const util = require('util');
const saltRounds = 10;
const initID = 1000;
const Logger = require('../controllers/logController.js');

const signupController = {
    getSignUp: function (req, res) {
        req.session.referral = '/signup';

        console.log(req.session.referral);

        res.render('signup');
    },

    postSignUp: async (req, res) => {
        var email = req.body.email;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var phone = req.body.phone;
        var bcrypt_result = null;

        async function insert(avatarPath) {
            var userID = bcrypt_result.length + initID;
            console.log(userID);
            var user = {
                userID: userID,
                username: username,
                password: bcrypt_password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                avatar: avatarPath, 
                isDeleted: 0
            }

            var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
    
            Logger.logAction("User signed up", user.username);
            
            await db.query(query).then((result) => {
                res.render('signup_success', {username: username});
            });
        }

        async function uploadPicture() {
            try {
                const username = req.body.username;
                const file = req.files.file;
                const fileName = file.name;
                const size = file.data.length;
                const extension = path.extname(fileName);
    
                const allowedExtensions = /png|jpeg|jpg/;
    
                if (!allowedExtensions.test(extension)) throw "Unsupported extension";
                if (size > 12000000) throw "File must be less than 12MB";
    
                const md5 = file.md5;
    
                const URL = "/images/avatar/"+username+extension;
    
                avatarPath = ".."+URL;
    
                await util.promisify(file.mv)("./dist"+URL);

                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    bcrypt_password = hash;
                    var query = 'SELECT * from `user`';

                    await db.query(query).then((result) => {
                        console.log(result);
                        bcrypt_result = result;
                        insert(avatarPath);
                    });
                });
    
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: err
                });
            }
        }

        uploadPicture();
    },

    getCheckUsername: async (req, res) => {
        var username = req.query.username;
        var query = 'SELECT * from `user` WHERE username = "' + username + '";';
        await db.query(query).then((result) => {
            res.send(result);
        });
    },

    getCheckPassword: async (req, res) => {
        var password = req.query.password;
        var query = 'SELECT * from `user` WHERE password = "' + password + '";';
        await db.query(query).then((result) => {
            res.send(result);
        });
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;
