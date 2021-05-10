const path = require('path');
const fastify = require('fastify')({ logger: true });

// Initialize root folder
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

// Routes
require("./api/routes/index.routes.js")(fastify);
require("./api/routes/character.routes.js")(fastify);
require("./api/routes/item.routes.js")(fastify);

// Run and listen
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