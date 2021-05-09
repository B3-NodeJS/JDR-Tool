const fastify = require('fastify')({ logger: true });

fastify.register(require('./socket'));
fastify.register(require('./route'));
fastify.register(require('./bot'));
//Première Méthode
/*fastify.ready(err => {
    if (err){
        console.log(err);
    }
    fastify.io.on('connect', (socket) => {
        console.log('Test Ok ', socket.id);
    });
    fastify.io.on('Test', (socket) => {
        console.log('Ttest');
    });
});*/

const PORT = 3000 || process.env.PORT;
const start = async () => {
    try {
        await fastify.listen(PORT);
        //Deuxième méthode
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
