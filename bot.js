'use strict';
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fastifyPlugin = require('fastify-plugin');

async function botTools() {

    const client = new Discord.Client();
    client.commands = new Discord.Collection();

    // Retrieve all commands
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    client.once('ready', function () {
        console.log(`Ready: ${client.user.tag}!`);
    });

    client.on('message', msg => {
        if (!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(msg, args, client);
        } catch (error) {
            console.error(error);
            msg.reply('there was an error trying to execute that command!');
        }
    });

    client.login(token);
}

module.exports = fastifyPlugin(botTools);
