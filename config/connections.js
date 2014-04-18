module.exports.connections = {
	disk: {
		adapter: 'sails-disk'
	},

	psql: {
		adapter	: 'sails-postgresql',
		host	: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
		user	: 'YOUR_POSTGRES_USER',
		password: 'YOUR_POSTGRES_PASSWORD', 
		database: 'YOUR_POSTGRES_DB'
	}
};