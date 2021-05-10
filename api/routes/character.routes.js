const mongoose = require("mongoose");

const Character = require("../models/character.model.js");

module.exports = (fastify) => {

    fastify.post("/api/create-character", (req, res) => {
        const character = new Character({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            biography: req.body.biography,
            age: req.body.age,
            class: req.body.class,
            equipment: req.body.equipment,
            stats: req.body.stats,
            items: req.body.items,
            coins: req.body.coins
        });

        character
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    });
}