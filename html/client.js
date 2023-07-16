(function () {
    const socket = io();
    socket.io.on("error", (error) => {
        console.log(socket.id, 'error', error);
    });
    socket.on("ping_from_server", (data) => {
        console.log(333, 'ping receinved from server', data);
    });
    socket.on("connect", () => {
        let cleint_data = { client_id: socket.id };
        console.log(222, 'conn data', 'on connected pinging to server', 'client data', cleint_data);
        socket.emit("ping_from_client", cleint_data);

        socket.on("disconnect", () => {
            console.log('disconnected', socket.id); // undefined
        });
    });
})();