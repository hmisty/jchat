const WebSocket = require('ws');

const PORT = 8888;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function(socket) {

	socket.on('message', function (msg) {
		var message = JSON.parse(msg);
		console.log(message);

		switch (message.type) {
			case 'username':
				socket.username = message.text;
				var reply = { 'type': 'is_online', 'text': '🔵 <i>' + socket.username + ' join the chat..</i>' };
				wss.clients.forEach(client => client.send(JSON.stringify(reply)));
				break;
			case 'chat_message':
				var reply = { 'type' : 'chat_message', 'text': '<strong>' + socket.username + '</strong>: ' + message.text };
				wss.clients.forEach(client => client.send(JSON.stringify(reply)));
				break;
			case 'disconnect':
				var reply = { 'type' : 'is_online', 'text': '🔴 <i>' + clients[socket] + ' left the chat..</i>' };
				wss.clients.forEach(client => client.send(JSON.stringify(reply)));
				break;
		}
	});

	wss.on("close", () => {
		var reply = { 'type' : 'is_online', 'text': '🔴 <i>' + clients[socket] + ' left the chat..</i>' };
		wss.clients.forEach(client => client.send(JSON.stringify(reply)));
	});


});

console.log("wss up :" + PORT);

