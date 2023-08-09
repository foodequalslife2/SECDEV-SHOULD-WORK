const Logger = require('../controllers/logController.js');

const logoutController = {
    getLogout: function(req, res) {
        try {
            var date = new Date().toJSON().slice(0, 10);

            Logger.logAction('User logged out', req.session.username);

            req.session.destroy(function(err) {
                if(err){
                    if(result[0].userID == 1001) { var msg = {error: error.stack }; }
                    else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
                    res.render('error', msg);
                }
                res.redirect('/');
            });
        }

        catch(error) {
            if(result[0].userID == 1001) { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
    }
}
module.exports = logoutController;