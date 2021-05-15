const fastifyPlugin = require('fastify-plugin');

async function socket(fastify) {

    fastify.register(require('fastify-socket.io'), {

    });

    fastify.ready(err => {

        if (err) {
            console.log(err);
        }

        fastify.io.on('connect', (socket) => {
            console.log('Connected : ');

            socket.on('Chat message', (msg) => {
                console.log('message: ' + msg);
                fastify.io.emit('Chat message', msg);

                if (msg.startsWith('!')) {
                    let str = msg.substr(1).split(' ');

                    switch(str[0]) {
                        case "roll":
                            fastify.io.emit('Chat message', 'test');
                            break;
                        case "create":
                            fastify.io.emit('Create');
                            break;
                        case "update":
                            fastify.io.emit('Chat message', 'CEST LA COMMANDE DE MODIFICATION');
                            break;
                        case "delete":
                            fastify.io.emit('Chat message', 'CEST LA COMMANDE DE SUPPRESSION');
                            break;
                        case "help":
                            fastify.io.emit('Chat message', "Liste des commande:\n-create vous permet de créer un perso\n-update vous permet de mettre à jour votre perso\n-delete supprime votre perso")
                        default:
                            fastify.io.emit('Chat message', 'Cette commande est inconnue');
                    }
                }
                
                socket.on('disconnect', () => {
                    console.log('Disconnect');
                });
            });
        });
    });
};

module.exports = fastifyPlugin(socket);