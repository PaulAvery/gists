module.exports.policies = {
	'*': 'isAdmin',
	'GistController': {
		'*': 'isAuthenticated',
		'find': true
	},
	'AuthController': true
};