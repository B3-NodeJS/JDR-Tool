const createCharacter = require('../components/createCharacter');

module.exports = {
    name: 'create',
    description: '\tPermet de créer un personnage\n\tExemple : !create John Snow',
    async execute(message, args) {
        
        const name = {
            firstName: args[0],
            lastName: args[1]
        }

        createCharacter(name);

        message.channel.send(`Personnage créé!`);
    },
};