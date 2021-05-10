const mongoose = require('mongoose');

// const types = ["Arme", "Armure", "Consommable", "Divers"];

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    type: String
});

module.exports = mongoose.model('Item', itemSchema);