'use strict';
const fastifyPlugin = require('fastify-plugin');

async function botTools() {

    const Discord = require('discord.js');
    const client = new Discord.Client();

    client.on('ready', function () {
        console.log(`Connecter ${client.user.tag}!`);
    });

    client.on('message', msg => {

        let dice = Math.floor(Math.random() * 6) + 1;

        if (msg.content === 'salut'){

            msg.reply('salut!');
        }

        if (msg.content === '!dice'){

            msg.reply('Je lance dé.\n Vous avez eu un dé ' + dice + ' !');
        }
    });

    client.login('ODQwNTk0MzUzMjM1Mjk2MjU3.YJaefw.MNLmE8DWfWkUEx2NpH1dCJoC1n0');
}

module.exports = fastifyPlugin(botTools);
