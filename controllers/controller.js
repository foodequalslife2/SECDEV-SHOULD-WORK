const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        res.render('index');
    },

    getSession: function (req, res) {
        try{
            if (req.session.username) {
                req.session.referral = '/profile/'+req.session.username;
                res.redirect('/profile/'+req.session.username);
                console.log('session found user: '+req.session.username);
            }
            else {
                req.session.referral = '/login';
                res.render('login');
            }
        }
    	catch(error){
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
    },

    getBack: function (req, res) {
        res.redirect(req.session.referral);
    }
}

module.exports = controller;