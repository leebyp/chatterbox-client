// YOUR CODE HERE:
var app = {};

app.fetch = function(){
	$.ajax({
		url: "https://api.parse.com/1/classes/chatterbox?order=-createdAt",
	    type: "GET",
	    dataType: 'json',
	    success: function(data){
	    	app.data = data.results;
	    	app.display(undefined, app.currentDisplayType);
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

app.rooms = [];

app.users = [];

app.friends = [];


app.currentDisplayType = 'all';



app.fetch();
