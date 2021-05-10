module.exports = {
	name: 'roll',
	description: '\tLancer de dé.\n\tExemple : !roll 3d10\n\tRésultat(s) : [5, 2, 6]',
	execute(message, args) {
        const regex = new RegExp('^\\d+\d\\d+$', 'i');
        let results = [];

        for (const arg of args) {
            if (!regex.test(arg))
                return message.channel.send(`Erreur dans la commande! Veuillez réessayer.\nPour plus d'informations, utilisez la commande : !help`);

            for (let i = 0; i < arg.split('d')[0]; i++) {
                results.push(Math.floor(Math.random() * arg.split('d')[1]) + 1);
            }
        }

		message.channel.send(`Résultat(s) : ${results}`);
	},
};