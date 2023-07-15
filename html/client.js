console.log(777);
(function () {
    const socket = io();
    socket.io.on("error", (error) => {
        console.log(socket.id, 'error', error);
    });
    socket.on("connected", (data) => {
        console.log(socket.id, 'connected');
        socket.emit("ping", { a: "b", c: [] });
    });
    socket.on("connection", (data) => {
        console.log(socket.id, 'connection');
    });
    socket.on("server_ping", (data) => {
        console.log(socket.id, 'server_ping', data);
    });
})();