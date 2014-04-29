// YOUR CODE HERE:
var app = {};

app.fetch = function(){
	$.ajax({
		url: "https://api.parse.com/1/classes/chatterbox?order=-createdAt",
	    type: "GET",
	    dataType: 'json',
	    success: function(data){
	    	console.log("updating correctly with fetch");
	    	app.data = data.results;
	    	app.display(app.particular, app.currentDisplayType);
	    	app.updateRooms();
	    	app.updateUsers();
	    }
	});
};

app.display = function(particular, type){

	$('.chat ul li').remove();

	for (var i=0; i<app.data.length; i++){
		
		var instance = app.data[i];
		var createdAt = $('<li/>').text(instance.createdAt).html(); 
		var roomname = $('<li/>').text(instance.roomname).html();
		var text = $('<li/>').text(instance.text).html();
		var username = $('<li/>').text(instance.username).html();
		var message = '<li>' + username + ': ' + text + '<br>' + createdAt + '</li>';
		
		if (type === 'room'){
			//print only messages from that room
			if (instance.roomname === particular){
				$('.chat ul').append(message)
			}
		}
		else if (type === 'person'){
			//print only messages from that person
			if (instance.username === particular){
				$('.chat ul').append(message)
			}
		}
		else if (type === 'all'){
			//print all messages
			$('.chat ul').append(message);
		}
	
	}

};

app.send = function(){

	$.ajax({
		url: "https://api.parse.com/1/classes/chatterbox",
	    type: 'POST',
	    data: JSON.stringify(data),
	    contentType: "application/json"
	});

};

app.updateUsers = function(){
	var users = [];
	for (var i=0; i<app.data.length; i++){
		var instance = app.data[i];
		var username = '<li>' + $('<li/>').text(instance.username).html() + '</li>';
		users.push(username);
	}
	users = _.uniq(users);
	for (var i=0; i<users.length; i++){
		$('.users ul').append(users[i]);
	}
}

app.updateRooms = function(){
	var rooms = [];
	for (var i=0; i<app.data.length; i++){
		var instance = app.data[i];
		var roomname = '<li>' + $('<li/>').text(instance.roomname).html() + '</li>';
		rooms.push(roomname);
	}
	rooms = _.uniq(rooms);
	for (var i=0; i<rooms.length; i++){
		$('.rooms ul').append(rooms[i]);
	}
}

app.init = function(){
	var self = this;
	app.fetch();
	setInterval(function(){
		self.fetch();
	}, 5000);
}

app.friends = [];

app.currentDisplayType = 'all';
app.particular = 'anonymous';


app.init();