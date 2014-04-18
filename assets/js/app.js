var app = new FW.App();

app.objects = {};
app.router = new FW.Router();

app.on('ready', function() {
	$.get('/api/auth/status').then(function(){
		app.logged = true;
		app.router.route();
	}, function() {
		app.router.route();
	});
});

app.on('error', function() {
	console.error.apply(console, arguments);
});