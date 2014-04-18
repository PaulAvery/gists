var passport = require('passport');

module.exports = {
	login: function(req,res,next) {
		passport.authenticate('local')(req, res, function(err) {
			if(err) return res.serverError(err);
			res.send(req.user);
		});
	},
	status: function(req, res) {
		if(req.user) return res.json(req.user);
		res.send(401, 'Unauthorized');
	},
	logout: function(req, res) {
		req.logout();
		res.send(200);
	}
};