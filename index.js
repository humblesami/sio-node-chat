const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/client_script', function (req, res) {
    res.sendFile(__dirname + '/html/client.js');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

let rooms = {};
let socketIds = {};
let idSockets = {};
let name_spaces = {};
let audience_by_id = {};

let emit_methods = require('./emits');
let events = require('./events');

io.on('connection', function (socket) {

    function disconnect_client(client_socket){        
        client_socket.disconnect();
    }

    function create_join_room(client_socket, room_id){
        client_socket.join(room_id);
    }

    function message_from_client(){
        
    }

    socket.on('ping_from_client', function (data_from_client) {        
        events.on_ping_received(socket, data_from_client);
    });

    socket.on('disconnected', function (msg) {
        console.log('User disconnected: ' + socket.id);        
    });

    let data_for_client = {client_id: socket.id};
    emit_methods.me_only(socket, 'ping_from_server', data_for_client);
});

server.listen(3000, function () {
    console.log('listening on *:3000');
});
