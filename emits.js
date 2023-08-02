
const emit_methods = {
    one_socket: function one_socket(socketId, event_at_client, data_to_send) {
        this.send_message_to_client(io.to(socketId), event_at_client, data_to_send);
    },
    me_only: function me_only(socket, event_at_client, data_to_send) {
        this.send_message_to_client(socket, event_at_client, data_to_send);
        //socket.emit('question', 'do you think so?', function (answer) {});
    }, 
    room_broadcast: function room_broadcast(room_id, event_at_client, data_to_send, not_me) {
        if (not_me) {
            this.send_message_to_client(socket.to(room_id), event_at_client, data_to_send);
        }
        else {
            this.send_message_to_client(io.to(room_id), event_at_client, data_to_send);
        }
    },
    some_rooms: function some_rooms(socket, event_at_client, data_to_send, room_ids) {
        let receviers = socket;
        for (let room_id of room_ids) {
            receviers = receviers.to(room_id);
        }
        this.send_message_to_client(receviers, event_at_client, data_to_send);
    },
    broad_cast: function broad_cast(event_at_client, data_to_send, not_me) {
        if (not_me) {
            this.send_message_to_client(io.sockets, event_at_client, data_to_send);
            this.send_message_to_client(socket.broadcast, event_at_client, data_to_send);
        }
        else {
            this.send_message_to_client(io, event_at_client, data_to_send);
        }
    },
    send_message_to_client: function(audience, event_at_client, data_to_send){        
        audience.emit(event_at_client, data_to_send);
    },
}

module.exports = emit_methods;
