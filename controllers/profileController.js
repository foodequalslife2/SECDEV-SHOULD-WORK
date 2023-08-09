const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const bcrypt = require('bcrypt');
const path = require('path');
const util = require('util');
const clone = require('clone');
const saltRounds = 10;
const Logger = require('../controllers/logController.js');

const profileController = {
    getProfile: function (req, res) {
      var username = req.params.username;
      var query = 'SELECT * from `user` WHERE username = "' + username + '";';

      db.query(query)
        .then((result) => {
            if(result.length > 0 || result != null || typeof result[0] !== 'undefined') {
              var details = {
                  userID: result[0].userID,
                  sessionname: req.session.username,
                  sessionID: req.session.userID,
                  firstName: result[0].firstName,
                  lastName: result[0].lastName,
                  username: result[0].username,
                  phone: result[0].phone,
                  followers: result[0].followers,
                  isDeleted: result[0].isDeleted
              };

              req.session.referral = '/profile/'+details.sessionname;

              console.log(req.session.referral);
              
              res.render('profile', details);
            } else {
                var msg = {error: 'Profile cannot be found.'}
                res.render('error', msg);
            }
          })
          .catch((error) => {
              console.log(error);
              if(req.session.username == 'admin') { var msg = {error: error.stack }; }
              else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
              res.render('error', msg);
          });
    },

    getProfileAvatar: function (req, res) {
      var username = req.params.username;

      var query = 'SELECT username, avatar from `user` WHERE username = "' + username + '";';
      
      db.query(query)
        .then((result) => { 
            if(result.length > 0 || typeof result[0] !== 'undefined') { 
                res.send(result[0]); 
            } else { 
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

    getProfilePosts: function (req, res) {
        var username = req.params.username;

        var query = 'SELECT * from `post` WHERE username = "' + username + '";';

        db.query(query)
          .then((result) => {
              if(result.length > 0 || result != null || typeof result[0] !== 'undefined') {
                  var trim = result[0];
                  res.render('profile', {trim})
              } else { 
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

    getUploadPage: function (req, res) {
      var username = req.session.username;

      var query = 'SELECT username, avatar from `user` WHERE username = "' + username + '";';
      
      db.query(query)
        .then((result) => { 
            if (result.length > 0 || result != null || typeof result[0] !== 'undefined') {
              var details = {
                  username: result[0].username,
                  avatar: result[0].avatar
              };

              req.session.referral = '/uploadPage/'+query.username;

              res.render('uploadPage', details)
            } else { 
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

    upload: async function (req, res) {
        try {
          var username = req.session.username;

          const file = req.files.file;
          const fileName = file.name;
          const size = file.data.length;
          const extension = path.extname(fileName);
          const toBeDeleted = req.body.avatarPath;

          const allowedExtensions = /png|jpeg|jpg/;

          if (!allowedExtensions.test(extension)) throw "Unsupported extension";
          if (size > 12000000) throw "File must be less than 12MB";

          const md5 = file.md5;

          const URL = "/images/avatar/"+username+extension;

          var avatarPath = ".."+URL

          await util.promisify(file.mv)("./dist"+URL);

          var query = 'UPDATE `user` SET avatar = "' + avatarPath + '" WHERE username = "' + username + '";';

          db.query(query)
            .then((result) => {
              if (result.length > 0 || result != null || typeof result[0] !== 'undefined') {
                var username = req.session.username;  
                Logger.logAction("User changed avatar photo at path " + avatarPath, username);
                res.redirect('/profile/'+username);
              } else {
                  var msg = 'Profile cannot be found.';
                  res.render('error', {msg});
              }
            })
            .catch((error) => {
                if(req.session.username == 'admin') { var msg = {error: error.stack }; }
                else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                res.render('error', msg);
            });
          
        } catch (err) {
            console.log(err);
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
    },

    getEditProfile: function (req, res) {
      var username = req.params.username;

      var query = 'SELECT username, avatar from `user` WHERE username = "' + username + '";';

      db.query(query)
        .then((result) => {
            if (result.length > 0 || result != null || typeof result[0] !== 'undefined') {
              var details = {
                  firstName: result[0].firstName,
                  lastName: result[0].lastName,
                  username: result[0].username,
                  phone: result[0].phone
              };

              req.session.referral = '/editprofile/'+query.username;

              res.render('editprofile', details)
            }
            else {
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

    postProfileInfo: function (req, res) {
        var flag1 = 0;
        var flag2 = 0;
        var hiddenInfo = {
          username: req.body.hiddenUsername,
          firstName: req.body.hiddenFirstName,
          lastName: req.body.hiddenLastName,
          phone: req.body.hiddenphone
        }
      
        var newInfo = {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone
        }
      
        var newname = newInfo.username;
        req.session.username = newname;
      
        console.log(hiddenInfo.username + " to " + newInfo.username);
      
        // Check if the username already exists
        var query = 'SELECT username, avatar from `user` WHERE username = "' + newname + '";';
        
        db.query(query).then((result) => {
          if (result[0] && !(newname === hiddenInfo.username)) {
            // Username already exists, set flag1 to 1
            flag1 = 1;
          }
      
          // Validate the phone number format
          var phoneNumberRegex = /^\+?[0-9]{1,3}-?[0-9]{1,14}$/;
          if (!phoneNumberRegex.test(newInfo.phone)) {
            // Phone number is not in the correct format, set flag2 to 1
            flag2 = 1;
          }
      
          if (flag1 === 1 && flag2 === 1) {
            // Both username exists and invalid phone number, redirect with both error messages
            res.redirect('/error?usernameExist=true&invalidPhoneNumber=true');
          } else if (flag1 === 1 && flag2 === 0) {
            // Username exists, redirect with username exist error message
            res.redirect('/error?usernameExist=true');
          } else if (flag1 === 0 && flag2 === 1) {
            // Invalid phone number, redirect with invalid phone number error message
            res.redirect('/error?invalidPhoneNumber=true');
          } else {
            // Phone number is valid and username is unique, continue with the update

            var query = 'UPDATE `user` SET username = "' + newInfo.username + '", firstName = "' + newInfo.firstName + '", lastName = "' + newInfo.lastName + '", phone = ' + newInfo.phone + ' WHERE username = "' + hiddenInfo.username +'";';
            

            db.query(query)
              .then((result) => {
                  if (result != null) {
                    Logger.logAction('User updated profile information to ' + newInfo.username + ', ' + newInfo.firstName + ', ' + newInfo.lastName + ', ' + newInfo.phone, hiddenInfo.username);

                    var oldPostQ = {
                      username: hiddenInfo.username
                    }
                    var newPostQ = {
                      username: newname
                    }

                    var query = 'UPDATE `comment` SET username = "' + newPostQ.username + '" WHERE username = "' + oldPostQ.username + '";';
                    
                    db.query(query)
                    .then((result) => {
                        var query = 'UPDATE `post` SET username = "' + newPostQ.username + '" WHERE username = "' + oldPostQ.username + '";';

                        db.query(query)
                        .then((result) => {
                            res.redirect('/profile/' + newname);
                        })
                        .catch((error) => {
                            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
                            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                            res.render('error', msg);
                        });
                    })
                    .catch((error) => {
                        if(req.session.username == 'admin') { var msg = {error: error.stack }; }
                        else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                        res.render('error', msg);
                    });
                  }
                  else{
                    var msg = {error: 'Oops! Something went wrong. Please try again later.' }; 
                    res.render('error', msg)
                  }
            });
          }
        });
    },

    getChangePassword: function (req, res) {
        var username = req.session.username;

        var query = 'SELECT username, password from `user` WHERE username = "' + username + '";';

        db.query(query)
          .then((result) => {
              if (result.length > 0 || result != null || typeof result[0] !== 'undefined') {
                var details = {
                    username: result[0].username,
                    password: result[0].password
                };
          
                req.session.referral = '/changepassword/'+query.username;
          
                res.render('changepass', details);
              }
              else {
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

      

    postChangePassword: function (req, res) {
      var curPassword = req.body.curPassword;
      var username = req.body.hiddenUsername;
    
      var hiddenInfo = {
        username: req.body.hiddenUsername,
        password: req.body.hiddenPassword
      }
      var newInfo = {
        username: req.body.hiddenUsername,
        password: req.body.newPassword
      }
    
      var query = 'SELECT userID, username, password from `user` WHERE username = "' + hiddenInfo.username + '" AND password = "' + hiddenInfo.password + '";';

      db.query(query)
        .then((result) => {
          if (result && result[0].username == username) {
            bcrypt.compare(curPassword, result[0].password, function (err, equal) {
              if (equal) {
                var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
                if (!passwordRegex.test(newInfo.password)) {
                  res.redirect('error?wrongPassword=true');
                } else {
                  bcrypt.hash(newInfo.password, saltRounds, function (err, hash) {
                    if (hash != null) {
                      newInfo.password = hash;
                      
                      var query = 'UPDATE `user` SET password = "' + newInfo.password + '" WHERE username = "' + username + '";';

                      db.query(query)
                      .then((result) => {
                          if (result != null) {
                            Logger.logAction('User updated password', newInfo.username);

                            var username = newInfo.username;
                            res.redirect('/profile/' + username);
                          }
                      })
                      .catch((error) => {
                          if(req.session.username == 'admin') { var msg = {error: error.stack }; }
                          else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                          res.render('error', msg);
                      });
                    } else {
                      var error = 'Something went wrong in storing password';
                      res.render('error', error);
                    }
                  });
                }
              } else {
                var error = 'Wrong password entered.';
                res.render('error', error);
              }
            });
          }
      })
      .catch((error) => {
          if(req.session.username == 'admin') { var msg = {error: error.stack }; }
          else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
          res.render('error', msg);
      });

    },

    deleteAccount: function (req, res) {
      var username = req.params.username;
      var userID = req.params.userID;

      console.log(username);
      console.log(userID);

      // DONE
      // User soft delete -- sets isDeleted to true instead of actually deleting the user 
      // there's probably a better way to do this but this is what I have right now 

      // var query = 'SELECT username, isDeleted from `user` WHERE username = "' + username + '";';

      // db.query(query).then((result) => {
      //  if (result != null) {
      //    var oldInfo = {
      //        username: username,
      //        isDeleted: false   // not sure  
      //    }
      //    var newInfo = {
      //        username: username,
      //        isDeleted: true
      //    }

      //    var query = 'UPDATE `user` SET isDeleted = 1 WHERE username = "' + username + '";'; 

      //    db.query(query).then((result) => {
      //      if (result != null) {
      //        var query = 'UPDATE `post` SET isDeleted = 1 WHERE username = "' + oldPostQ.username + '";';

      //        db.query(query).then((result) => {
      //          if (result != null) {
      //            var query = 'UPDATE `comment` SET isDeleted = 1 WHERE username = "' + oldPostQ.username + '";';

      //            db.query(query).then((result) => {
      //              res.send(true); 
      //            })
      //          }
      //        });
      //      }
      //    });
      //  }
      //});
      
      var query = 'DELETE from `user` WHERE username = "' + username + '";';

      db.query(query)
      .then((result) => {
          Logger.logAction('User deleted account', username);

          var query = 'DELETE from `post` WHERE username = "' + username + '";';

          db.query(query)
          .then((result) => {
              var query = 'DELETE from `comment` WHERE username = "' + username + '";';
              
              db.query(query)
              .then((result) => {
                  res.send(true);
              })
              .catch((error) => {
                  if(req.session.username == 'admin') { var msg = {error: error.stack }; }
                  else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                  res.render('error', msg);
              });
          })
          .catch((error) => {
              if(req.session.username == 'admin') { var msg = {error: error.stack }; }
              else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
              res.render('error', msg);
          });
      })
      .catch((error) => {
          if(req.session.username == 'admin') { var msg = {error: error.stack }; }
          else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
          res.render('error', msg);
      });
      
      // db.deleteOne(Users, query, function (result) {
      //     if (result) {

      //         query = {
      //             username: username
      //         }

      //         db.deleteMany(Posts, query, function (result) {
      //             if (result) {
      //                 db.deleteMany(Comments, query, function (result) {
      //                     if (result) {
      //                         res.send(true);
      //                     }
      //                 });
      //             }
      //         });
      //     }
      // });
    },

    followAccount: function (req, res) {
        var toBeFollowed = req.params.username;
        var sessionname = req.session.username;
        var sessionID = req.session.userID;

        console.log(toBeFollowed+" "+sessionname);

        var query = 'SELECT followers from `user` where username = "' + toBeFollowed + '";';

        db.query(query)
        .then((result) => {
            followers = result[0].followers;
            followers++;

            var query = 'UPDATE `user` SET followers = ' + followers + ' WHERE username = "' + toBeFollowed + '";';

            db.query(query)
              .then((result) => {
                res.send(true);
            })
            .catch((error) => {
                if(req.session.username == 'admin') { var msg = {error: error.stack }; }
                else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                res.render('error', msg);
            });
        })
        .catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });
    },

    getFollowers: function (req, res) {
        var username = req.params.username;
        console.log(username);

        var query = 'SELECT username followers from `user` where username = "' + username + '";';

        db.query(query)
        .then((result) => {
            if (result.length > 0 || result != null || typeof result[0] !== 'undefined') {
              res.send(result[0].followers);
            }
            else {
                var msg = 'Profile cannot be found.';
                res.render('error', {msg});
            }
        })
        .catch((error) => {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        });
    }
}


/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = profileController;
