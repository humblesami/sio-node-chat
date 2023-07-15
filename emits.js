function me_only(socket, event, data) {
    socket.emit(event, data);
    //socket.emit('question', 'do you think so?', function (answer) {});
}
function one_socket(socket, socketId) {
    io.to(socketId).emit('hey', 'I just met you');
}

function broad_cast(not_me) {
    if (not_me) {
        io.sockets.emit('hello', msg);
        socket.broadcast.emit('broadcast', 'hello friends!');
    }
    else {
        io.emit('hello', msg);
    }
}
function room_broadcast(room_id, not_me) {
    if (not_me) {
        socket.to('game').emit('hello', msg);
    }
    else {
        io.to('my room').emit('hello', msg);
    }
}
function some_rooms(socket, room_ids) {
    let receviers = socket;
    for (let room_id of room_ids) {
        receviers = receviers.to(room_id);
    }
    receviers.emit('title', msg);
    //socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");
}
let emit_methods = {
    one_socket: one_socket, me_only: me_only, 
    room_broadcast: room_broadcast, some_rooms: some_rooms,
    broad_cast: broad_cast
}
module.exports = emit_methods;