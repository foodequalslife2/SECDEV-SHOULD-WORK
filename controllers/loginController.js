const db = require('../models/mysqldb.js');
const bcrypt = require('bcrypt');
const Logger = require('../controllers/logController.js');

const loginController = {
    getLogin: function (req, res) {
        req.session.referral = '/login';
        
		res.render('login');
	},

    getPassword: async (req, res) => {
        var username = req.query.username;
        var password = req.query.password;

        var query = 'SELECT * from `user` WHERE username = "' + username + '";';

        await db.query(query)
            .then((result) => {
                if (result != null) {
                    bcrypt.compare(password, result[0].password, function (err, equal) {
                        if (equal && result[0].isDeleted == 0) {
                            res.send(true);
                        }
                        else {
                            res.send(false);
                        }
                    });
                }
                else {
                    res.send(false);
                }
            })
            .catch((error) => {
                if(result[0].userID == 1001) { var msg = {error: error.stack }; }
                else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                res.render('error', msg);
            });
    },

	postLogin: async (req, res) =>{
        try{
            var username = req.body.username;
            var password = req.body.password;

            var query = 'SELECT * from `user` WHERE username = "' + username + '";';
            var querypass = null;

            await db.query(query)
            .then((result) => {
                if (result == null || result[0].isDeleted == 1) {
                    var error = {error: 'Account does not exist / Password not found'}
                    res.send('error', error);
                }
                else if (result[0].username == username && result != null) {
                    bcrypt.compare(password, result[0].password, function (err, equal) {
                        if (equal) {
                            req.session.username = result[0].username;
                            req.session.userID = result[0].userID;
                            
                            console.log("Session: "+req.session.username);

                            var date = new Date().toJSON().slice(0, 10);

                            Logger.logAction('User logged in', req.session.username);

                            res.redirect('/profile/'+result[0].username);
                        }
                        else {
                            var error = {error: 'Account does not exist / Password not found'}
                            res.send('error', error);
                        }
                    });
                }
            })
            .catch((error) => {
                if(result[0].userID == 1001) { var msg = {error: error.stack }; }
                else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                res.render('error', msg);
            });
        }
        catch(error) {
            if(result[0].userID == 1001) { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
	}
}

module.exports = loginController;