const path = require('path');
const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

fastify.get('/', function (req, reply) {
    //console.log(req.query.role);
    if (req.query.role == 'player'){
        return reply.redirect('/player');
    }

    if (req.query.role == 'gm'){
        return reply.redirect('/gm')
    }

    return reply.sendFile('index.html');
});

fastify.get('/player', function (req, reply) {
    return reply.sendFile('player.html');
});

fastify.get('/gm', function (req, reply) {
    return reply.sendFile('gm.html');
});

/*const opts = {

    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        }
    }
}
fastify.get('/test', opts, function (request, reply) {

    //console.log(request.body);
    reply.send({ hello: 'world'});
});*/

const PORT = 3000 || process.env.PORT;
const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
