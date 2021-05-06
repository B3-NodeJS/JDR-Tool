async function routes (fastify, options) {

    const path = require('path');

    fastify.register(require('fastify-static'), {

        root: path.join(__dirname, 'public'),
        prefix: '/public'
    });

    fastify.get('/', (req, reply) => {
        //console.log(req.query.username);
        if (req.query.role == 'player'){
            return reply.redirect('/player/' + req.query.username);
        }

        if (req.query.role == 'gm'){
            return reply.redirect('/game-master/' + req.query.username);
        }

        fastify.io.emit('Test');

        return reply.sendFile('index.html');
    });

    fastify.get('/player/:username', (req, reply) => {
        //reply.send('Bienvenu à toi ' + req.params.username);
        return reply.sendFile('player.html');
    });

    fastify.get('/game-master/:username', (req, reply) => {
        return reply.sendFile('gm.html');
    });
}

module.exports = routes;
