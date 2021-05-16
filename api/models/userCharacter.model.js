const mongoose = require('mongoose');

const Character = require("./character.model.js").schema;

const userCharacterSchema = mongoose.Schema({
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    },
    username: String,
    discordId: String
});

module.exports = mongoose.model('UserCharacter', userCharacterSchema);