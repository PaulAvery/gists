app.router.add('/articles', function() {
	app.current = null;
	$('#article').removeClass('edit');
	$('.view').removeClass('visible');

	$.get('/api/gist').then(function(data) {
		$('#list>ul').html(data.reduce(function(a, b) {
			return a + '<li><a href="#/articles/' + b.id +'">' + b.title + '</a></li>'
		}, ''));

		if(app.logged) {
			$('#list>ul').append('<li class="add"><a href="#/articles/new">+</a></li>');
		}

		$('#list').addClass('visible');
	});
}, true)