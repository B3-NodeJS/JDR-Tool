const mongoose = require('mongoose');

const Item = require("./item.model.js").schema;

// const itemSchema = new Item();

const characterSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    biography: String,
    age: Number,
    class: String,
    equipment: {
        weapons: [Item],
        armor: [Item]
    },
    stats: {
        strength: Number,
        agility: Number,
        stealth: Number,
        intelligence: Number,
        physicalRes: Number,
        magicalRes: Number,
        hp: Number,
        mp: Number,
        xp: Number,
        lvl: Number
    },
    items: [
        {
            itemId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Author' 
            },
            quantity: Number
        }
    ],
    coins: Number
});

module.exports = mongoose.model('Character', characterSchema);