module.exports.bootstrap = function (cb) {
	User.findOrCreate({name: 'admin'}, {name: 'admin', password: 'password', admin: true}).exec(function(err) {
		cb(err);
	});
};
