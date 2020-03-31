function seedMessage() {
	var content = $('#m').val();
	if(content) {
		var msg = {
			username: 'Bob',
			content: content
		}
		socket.emit('CHAT_MESSAGE', JSON.stringify(msg));
		$('#m').val('');
	}
	return false;
}


$(window).keydown(function(event){
	if(event.keyCode == 13) {
		event.preventDefault();
		seedMessage()
	}
});


$("#m_submit").click(function(event){
	seedMessage()
});

socket.on('CHAT_MESSAGE', function(msg){
	var msg = JSON.parse(msg);
	var side;

	if(msg.username === 'Bob') {
		side = 'right appeared';
	} else {
		side = 'left appeared';
	}

	var $message;
	$message = $($('.message_template').clone().html());
	$message.addClass(side).find('.text').html(msg.content);
	$('.messages').append($message);
	return setTimeout(function () {
		return $message.addClass('appeared');
	}, 0);
});
