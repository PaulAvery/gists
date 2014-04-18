var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findOne(id, done);
});

passport.use(new Strategy({
	usernameField: 'username',
	passwordField: 'password'
}, function(name, password, done) {
	User.findOne({name: name}, function(err, user) {
		if(err) return done(err);

		if(!user) return done(null, false);
		
		user.verify(password, function(err, res) {
			if(!res) return done(null, false);

			return done(null, user);
		});
	});
}));