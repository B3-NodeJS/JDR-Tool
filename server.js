const path = require('path');
const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

fastify.get('/', function (req, reply) {
    return reply.sendFile('index.html');
});

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