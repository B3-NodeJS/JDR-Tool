const listCharacter = require('../components/listCharacter');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'list',
    description: '\tAffiche la liste des personnages\n\tExemple : !list',
    execute(message, args) {
        const results = listCharacter(() => {
            return message.channel.send(`Une erreur est survenue... Veuillez réessayer plus tard.\nPour plus d'informations, utilisez la commande : !help`);
        });

        message.channel.send('Liste des personnages :');

        results.then(async (results) => {
            for (result of results) {
                let weapons = [], armor = [], items = [];

                for (weapon of result.equipment.weapons) {
                    const response = await fetch(`http://127.0.0.1:3000/api/item/${weapon}`);
                    const result = await response.json();
                    weapons.push(`${result.name}`);
                }

                for (gear of result.equipment.armor) {
                    const response = await fetch(`http://127.0.0.1:3000/api/item/${gear}`);
                    const result = await response.json();
                    armor.push(`${result.name}`);
                }

                for (item of result.items) {
                    const response = await fetch(`http://127.0.0.1:3000/api/item/${item._id}`);
                    const result = await response.json();
                    items.push(`${result.name} * ${item.quantity}`);
                }

                const charactersSheet = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Prénom: " + result.firstName + "\nNom: " + result.lastName)
                    .addFields(
                        {
                            name: 'Biographie',
                            value: '\u200B' + result.biography
                        },
                        {
                            name: 'Profil',
                            value: (
                                "Age: " + result.age + "\t\t\tClasse: " + result.class
                            )
                        },
                        {
                            name: 'Statistiques',
                            value: (
                                "Force: " + result.stats.strength + "\n" +
                                "Agilité: " + result.stats.agility + "\n" +
                                "Res. Physique: " + result.stats.physicalRes + "\n" +
                                "PV: " + result.stats.hp + "\n" +
                                "EXP: " + result.stats.xp
                            ),
                            inline: true
                        },
                        {
                            name: '\u200B',
                            value: (
                                "Furtivité: " + result.stats.stealth + "\n" +
                                "Intelligence: " + result.stats.intelligence + "\n" +
                                "Res. Magique: " + result.stats.magicalRes + "\n" +
                                "PM: " + result.stats.mp + "\n" +
                                "Niveau: " + result.stats.lvl
                            ),
                            inline: true
                        },
                        {
                            name: 'Equipement',
                            value: (
                                "\tArmes: " + weapons + "\n" +
                                "\tArmure: " + armor
                            ),
                            inline: false
                        },
                        {
                            name: 'Inventaire',
                            value: (
                                "Objets: " + items + "\n" +
                                "Monnaie: " + result.coins
                            ),
                            inline: true
                        }
                    )

                message.channel.send(charactersSheet);
            }
        })
    },
};