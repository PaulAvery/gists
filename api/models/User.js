var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		name: {
			type: 'string',
			required: true
		},
		password: {
			type: 'string',
			required: true
		},
		admin: {
			type: 'boolean',
			required: true,
			defaultsTo: false
		},
		verify: function(password, cb) {
			bcrypt.compare(password, this.password, cb);
		},
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			return obj;
		}
	},

	beforeCreate: function (ats, next) {
		bcrypt.hash(ats.password, 10, function(err, hash) {
			if (err) return next(err);

			ats.password = hash;
			next();
		});
	}
};