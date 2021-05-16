const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Voir toutes les commandes',
    execute(message, args, client) {

        const helper = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Help")
            .setDescription("Liste des commandes");

        for (const [key, value] of client.commands) {
            helper.addField(value.name, value.description);
            // msg.channel.send(`Nom : ${value.name}\nDescription :\n${value.description}`);
        };

        message.channel.send(helper);
    },
};