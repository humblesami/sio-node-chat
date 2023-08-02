event_utils = {
    verify_user: async function(client_socket){
        return {success: 1}
    }
}

module.exports = {
    on_ping_received: function(socket, data_from_client){
        console.log('Ping received from '+socket.id, data_from_client);
    },
    on_ping_responded : function(client_socket, data){
        event_utils.verify_user(client_socket, data).then((data)=>{
            console.log(data);
            if(data.success){
                socket.verified = 1;
                socket.emit('auth_success', data);
            }
            else{
                socket.disconnect();
            }
        });
    },    
}