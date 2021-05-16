module.exports = (fastify) => {
    fastify.get('/', (req, reply) => {
        if (req.query.role == 'player')
            return reply.redirect('/player?username=' + req.query.username);
    
        if (req.query.role == 'gm')
            return reply.redirect('/game-master?username=' + req.query.username);
    
        return reply.sendFile('index.html');
    });
    
    fastify.get('/player', (req, reply) => {
        return reply.sendFile('player.html');
    });
    
    fastify.get('/game-master', (req, reply) => {
        return reply.sendFile('gm.html');
    });
}