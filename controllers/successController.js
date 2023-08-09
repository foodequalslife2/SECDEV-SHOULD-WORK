const successController = {
    getSuccess: function (req, res) {
        try {
            var details = {
                firstName: req.query.fName,
                lastName: req.query.lName,
                username: req.query.username
            };
    
            req.session.referral = '/success';
    
            res.render('success', details);
        }
        catch(error) {
            if(req.session.username == 'admin') { var msg = {error: error.stack }; }
            else { var msg = {error: 'Oops! Something went wrong. Please try again later.' }; }
            res.render('error', msg);
        }
    }

}

module.exports = successController;
