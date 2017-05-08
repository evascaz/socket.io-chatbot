// <!-- https://socket.io/get-started/chat/ -->    
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {
	// "socket.id": color;
}

var connections = new Array;
var colors = ["#2874A6","#E67E22","#884EA0","34495E","#F7DC6F","#7DCEA0"];

function randomColor() {
	return Math.round(Math.random()*colors.length);
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', handleConnection);


function handleConnection(socket) {
  //On Open, send a message. Check in web console if this shows up.
  socket.emit('hello', {hello: "Im here"});

//On Open console log(terminal) the below: 
 console.log("new connection!", socket.id);

// connections.push(socket);

  // users[socket.id] = colors[randomColor()];
  // var currentColor = users[socket.id];

  // console.log("the current color is:" + currentColor);
  // console.log(users[socket.id]);

  socket.on('textChanged', function(data){
    // console.log("svg is: " + data.xPosition + data.yPosition + data.text);
  io.emit('svgData', data)
    // broadcast(data);
    // socket.emit('svgData', { data: data.text});
  });

  // socket.on('close', function() {
  //   var position = connections.indexOf(socket);
  //   connections.splice(position,1);
  // });

}

// function broadcast(data) {
//   for (c in connections) {
//     connections[c].send(data);
//   }
// }


http.listen(3070, function(){
  console.log('listening on *:3070');
});

