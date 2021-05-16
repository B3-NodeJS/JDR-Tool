const fetch = require('node-fetch');

const createCharacter = async (args) => {

    const character = {
        firstName: args.firstName,
        lastName: args.lastName,
        biography: '\u200B',
        age: 0,
        class: '\u200B',
        equipment: {
            weapons: [],
            armor: []
        },
        stats: {
            strength: 0,
            agility: 0,
            stealth: 0,
            intelligence: 0,
            physicalRes: 0,
            magicalRes: 0,
            hp: 0,
            mp: 0,
            xp: 0,
            lvl: 0
        },
        items: [],
        coins: 0
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(character),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://127.0.0.1:3000/api/character', options);
};

module.exports = createCharacter;