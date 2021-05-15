const rollDice = require('../components/rollDice');

module.exports = {
	name: 'roll',
	description: '\tLancer de dé.\n\tExemple : !roll 3d10\n\tRésultat(s) : [5, 2, 6]',
	execute(message, args) {
        const results = rollDice(args, () => {
            return message.channel.send(`Erreur dans la commande! Veuillez réessayer.\nPour plus d'informations, utilisez la commande : !help`);
        });

		message.channel.send(`Résultat(s) : ${results}`);
	},
};