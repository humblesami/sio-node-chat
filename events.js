event_utils = {
    verify_user: async function(client_socket){
        return {success: 1}
    }
}


export default events = {
    on_ping_responded : function(client_socket, data){
        verify_user(client_socket, data).then((data)=>{
            console.log(data);
            if(data.success){
                socket.verified = 1;
                socket.emit('auth_success', data);
            }
            else{
                socket.disconnect();
            }
        });
    }
}