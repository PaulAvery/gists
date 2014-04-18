window.FW = window.FW || {};

FW.Router = function(check) {
	this.routes = [];
	this.check = check || function(cb) {cb(true);};

	window.onhashchange = this.route.bind(this, null);
};

FW.Router.prototype.add = function(path, fn, def) {
	this.routes.push({path: this.normalize(path), fn: fn});
	if(def) this.def = this.routes.length-1;
};

FW.Router.prototype.redirect = function(path, append) {
	if(append) fn = 'pushState';
	if(!append) fn = 'replaceState';
	
	window.history[fn]('', '', '#' + path);
	this.route();
};

FW.Router.prototype.route = function(path) {
	var self = this;
	var params;
	path = this.normalize(path || window.location.hash.substr(1));

	if(window.location.hash.length < 2) {
		this.redirect('/');
		return;
	}

	this.check(function(result) {
		for(var x = 0; x < self.routes.length; x++) {
			params = {};
			if (self.routes[x].path.length !== path.length) continue;
			if (self.routes[x].path.length === 0) return self.routed(x, params);

			for(var y = 0; y < path.length; y++) {
				if(self.routes[x].path[y][0] === ':') {
					params[self.routes[x].path[y].substr(1)] = path[y];
				} else if (self.routes[x].path[y] !== path[y]) {
					break;
				}

				if(y === path.length-1) {
					if(this.def === x || result) {
						return self.routed(x, params);
					}
				}
			}
		}

		if(!_.isEqual(path, self.routes[self.def].path)) {
			self.redirect('/'+self.routes[self.def].path.join('/'));
		}
	});
};

FW.Router.prototype.routed = function(x, params) {
	console.log('Routed to', '/'+this.routes[x].path.join('/'));
	if(typeof this.routes[x].fn === 'function') {
		this.routes[x].fn(params);
	} else {
		this.routes[x].fn.render(params);
	}
};

FW.Router.prototype.normalize = function(path) {
	var arr = path.split('/');
	var normArr = [];

	arr.forEach(function(el) {
		if(el.length > 0) normArr.push(el);
	});

	return normArr;
};