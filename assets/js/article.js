app.router.add('/articles/:id', function(opts) {
	$('.view').removeClass('visible');
	
	var promise;
	if(opts.id === 'new') {
		$.post('/api/gist', {title: 'New Title', content: '1. Write some markdown here \n2. See it on the left!'}).then(function(data) {
			app.router.redirect('/articles/'+data.id);
		});
	} else {
		$.get('/api/gist/'+opts.id).then(function(data) {
			$('#title').val(data.title);
			$('#markdown').val(data.content);
			app.current = data.id;
			app.redraw();

			$('#article').addClass('visible');
		});
	}
});

app.edit = function() {
	$('#article').toggleClass('edit');
}

app.redraw = function() {
	var title = $('#title').val();
	var content = $('#markdown').val();

	var button = app.logged ? '<span onclick="app.edit()" id="edit" class="sprite sprite-settings"></span>' : '';
	var header = '<h1>'+title+button+'</h1>';
	
	$('#result').html(header + marked(content));
}

document.onkeydown = function(e) {
	if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
		e.preventDefault();
		$.ajax({
			url: '/api/gist/'+app.current,
			type: 'PUT',
			data: {
				title: $('#title').val(),
				content: $('#markdown').val()
			}
		}).then(function(data) {
			if(!data.status) {
				$('#alert')
					.html('Saved')
					.addClass('visible');

				window.setTimeout(function() {
					$('#alert').removeClass('visible');
				}, 500);
			} else {
				$('#alert')
					.html('Failed Saving')
					.addClass('visible');
				
				window.setTimeout(function() {
					$('#alert').removeClass('visible');
				}, 500);		
			}
		})
	}
}

$(function() {
	$('#markdown, #title').on('change keyup paste', app.redraw);

	//Allow tab support
	$('#markdown').keydown(function(e) {
		if(e.keyCode === 9) {
			var start = this.selectionStart;
			var end = this.selectionEnd;

			var $this = $(this);
			var value = $this.val();

			$this.val(value.substring(0, start) + "\t" + value.substring(end));
			this.selectionStart = this.selectionEnd = start + 1;

			e.preventDefault();
		}
	});
});