window.FW = window.FW || {};

FW.Authenticator = function(request) {
	this.request = request;
};

FW.Authenticator.prototype.check = function(cb) {
	var self = this;
	this.request.run().then(function(user) {
		self.in = true;
		self.user = user;
		cb();
	}, function() {
		self.in = false;
		self.user = null;
		cb();
	});
};

FW.Authenticator.prototype.in = false;
FW.Authenticator.prototype.logged = function(cb) {if(cb) cb(this.in); return this.in;};
FW.Authenticator.prototype.user = null;