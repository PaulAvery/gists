window.FW = window.FW || {};

FW.EventEmitter = function() {
	
	//Bind callback to handler, safe parameter decides if it should be possible to unbind this callback later
	this.on = function (event, callback) {

		this.initEvents();
		if (typeof this._events[event] === 'undefined') {
			this._events[event] = [];
		}
		
		this._events[event].push(callback);
	
	};
	
	//Unbinds all unbindable callbacks
	this.off = function (event) {
		this.initEvents();
		this._events[event] = {};
	};
	
	//Evokes event with corresponding options, safe decides if non-unbindable events should be evoked, too
	this.emit = function (event, options) {
		this.initEvents();
		if (typeof this._events[event] !== 'undefined') {
			for (var x = 0; x < this._events[event].length; x++) {
				this._events[event][x].apply(null, options);
			}
		}
	};

	//Setup events object
	this.initEvents = function() {
		this._events = this._events || {};
	};
};