const fastify = require('fastify')({ logger: true });
const path = require('path');
const db = require('./api/db');

// Initialize root folder
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'src/public'),
    prefix: '/src/public/'
});

fastify.register(require('./socket'));
fastify.register(require('./bot'));

// Routes
require("./api/routes/index.routes.js")(fastify);
require("./api/routes/character.routes.js")(fastify);
require("./api/routes/item.routes.js")(fastify);

// Run and listen
const PORT = 3000 || process.env.PORT;
const start = async () => {
    try {
        await fastify.listen(PORT);
        //Second method
        /*fastify.io.on('connection', (socket) => {
            console.log('Un utilisateur est connecter!');
            socket.on('Chat message', (msg) => {
                console.log('message: ' + msg);
                fastify.io.emit('Chat message', msg);
            });
            socket.on('disconnect', () => {
                console.log('Un utilisateur c\'est déconnecter!');
            });
        });*/
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
