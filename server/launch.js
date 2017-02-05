import express from 'express';
// import socketio from 'socket.io';
import homepage from './middleware/homepage';
import sockets from './sockets';

function setupRoutes(application) {
    application.get('/', homepage);
}

function start(port = 7080) {
    const application = express();

    setupRoutes(application);

    const server = application.listen(port, () => {
        console.log(`Server running on: ${port}`);
    });

    sockets(server, console);

    return server;
}

export default start;
