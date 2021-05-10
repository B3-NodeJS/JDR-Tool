module.exports = (fastify) => {
    fastify.get('/', (req, reply) => {
        if (req.query.role == 'player')
            return reply.redirect('/player/' + req.query.username);
    
        if (req.query.role == 'gm')
            return reply.redirect('/game-master/' + req.query.username);
    
        return reply.sendFile('index.html');
    });
    
    fastify.get('/player/:username', (req, reply) => {
        return reply.sendFile('player.html');
    });
    
    fastify.get('/game-master/:username', (req, reply) => {
        return reply.sendFile('gm.html');
    });
}