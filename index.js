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
    console.log('a user connected', socket.conn.id);
    
    emit_methods.me_only(socket, 'server_ping', {client_id: socket.conn.id});
    socket.on('disconnected', function (msg) {
        console.log('User disconnected: ' + socket.id);        
    });
    socket.on('disconnection', function (msg) {
        console.log('User disconnection: ' + socket.id);        
    });
});

function onMessageReceived(){

}

server.listen(3000, function () {
    console.log('listening on *:3000');
});