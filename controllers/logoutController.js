const Logger = require('../controllers/logController.js');

const logoutController = {
    getLogout: function(req, res) {
        var date = new Date().toJSON().slice(0, 10);

        Logger.logAction('User logged out', req.session.username);

        req.session.destroy(function(err) {
            if(err)
                throw err;
            res.redirect('/');
        });
    }
}
module.exports = logoutController;