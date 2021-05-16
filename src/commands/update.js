const updateCharacter = require('../components/updateCharacter');

module.exports = {
    name: 'update',
    description: '\tPermet de modifier un personnage (NE FONCTIONNE PAS POUR LE MOMENT)\n\tExemple : !update John Snow age 3\n\tParamètres disponibles : prenom, nom, bio, age, classe, argent, for, agi, fufu, int, resphys, resmag, pv, pm, exp, niv',
    async execute(message, args) {

        updateCharacter(args);

        message.channel.send(`Personnage modifié!`);
    },
};