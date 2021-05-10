const fastifyPlugin = require('fastify-plugin');

async function socket(fastify) {

    fastify.register(require('fastify-socket.io'), {

    });

    fastify.ready(err => {

        if (err) {

            console.log(err)
        }

        fastify.io.on('connect', (socket) => {

            console.log('Connected : ' + socket.rooms);
            socket.on('Chat message', (msg) => {

                console.log('message: ' + msg);
                fastify.io.emit('Chat message', msg);
            });
            socket.on('disconnect', () => {

                console.log('Disconnect');
            });
        });
    });
}

module.exports = fastifyPlugin(socket);
