app.router.add('/login', function() {
	app.current = null;
	$('#article').removeClass('edit');
	$('.view').removeClass('visible');
	$.get('/api/auth/status').then(function(){
		app.logged = true;
		app.router.redirect();
	}, function(err) {
		if(err.status !== 401) {
			$('#alert')
				.html('Failed to get login status')
				.addClass('visible');
		};

		$('#login').addClass('visible');
	});
});

app.login = function() {
	$.get('/api/auth/login', {
		username: $('#username').val(),
		password: $('#password').val()
	}).then(function(data) {
		app.logged = true;
		app.router.redirect();
	}, function(err) {
		if(err.status === 401 || err.status === 400) {
			$('#alert').html('Invalid Credentials');
		} else {
			$('#alert').html('Failed to login');
		};

		$('#alert').addClass('visible');
	});
};

$(function() {
	$('#login').keyup(function(e) {
		if(e.keyCode === 13) {
			$('#butlogin').click();
			e.preventDefault();
			return false;
		}
	});
});