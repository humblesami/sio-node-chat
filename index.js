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

async function verify_user(){
    return {success: 1};
}

let emit_methods = require('./emits');
console.log(emit_methods);
io.on('connection', function (socket) {

    function disconnect_client(client_socket){        
        client_socket.disconnect();
    }

    function create_join_room(client_socket, room_id){
        client_socket.join(room_id);
    }

    socket.on('ping_from_client', function (data) {
        console.log('Ping received from client', data);        
    });
    socket.on('disconnected', function (msg) {
        console.log('User disconnected: ' + socket.id);        
    });

    let data_for_client = {client_id: socket.id};
    console.log('pinging to client', data_for_client);
    emit_methods.me_only(socket, 'ping_from_server', data_for_client);
});


server.listen(3000, function () {
    console.log('listening on *:3000');
});