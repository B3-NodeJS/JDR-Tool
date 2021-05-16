const fetch = require('node-fetch');

const listCharacter = async (err) => {
    let list = [], results;

    const response = await fetch('http://127.0.0.1:3000/api/characters');
    results = await response.json();

    for (result of results) {
        list.push({
            firstName: result.firstName,
            lastName: result.lastName,
            biography: result.biography,
            age: result.age,
            class: result.class,
            equipment: result.equipment,
            stats: result.stats,
            items: result.items,
            coins: result.coins
        });
    }

    return list;
};

module.exports = listCharacter;