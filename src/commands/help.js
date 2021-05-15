module.exports = {
    name: 'help',
    description: 'Voir toutes les commandes',
    execute(msg, args, client) {
        msg.channel.send('\tListe des commandes :')

        for (const [key, value] of client.commands) {
            msg.channel.send(`Nom : ${value.name}\nDescription :\n${value.description}`);
        };
    },
};