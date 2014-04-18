window.FW = window.FW || {};

FW.App = function() {
	var self = this;
	this._attached = [];

	$(function() {
		Promise.all(self._attached)
			.then(self.emit.bind(self, 'ready'))
			.catch(self.emit.bind(self, 'error'));;
	});
};

FW.App.prototype = new FW.EventEmitter();

FW.App.prototype.attach = function(name, promise) {
	var self = this;
	if(Promise.is(promise)) {
		this._attached.push(promise.then(function(result) {
			self[name] = result;
		}));
	} else {
		this[name] = promise;
	}
};

FW.App.prototype.alert = function(text, type) {
	$('#alert').html(text).removeClass(function (index, css) {
		return (css.match (/\balert-\S+/g) || []).join(' ');
	}).addClass('alert-'+type).removeClass('hide');
};

FW.App.prototype.error = function(err) {
	this.emit('error', err);
}