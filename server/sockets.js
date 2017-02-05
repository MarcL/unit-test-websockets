import socketio from 'socket.io';

function sockets(server, logger) {
    const io = socketio(server);

    io.on('connection', (socket) => {
        logger.log('User connected');

        socket.on('disconnect', () => {
            logger.log('User disconnected');
        });

        socket.on('clientMessage', (message) => {
            logger.log(`sending message from server: ${message}`);
            io.emit('serverMessage', message);
        });
    });
}

export default sockets;
