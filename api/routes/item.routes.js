const mongoose = require("mongoose");

const Item = require("../models/item.model.js");

module.exports = (fastify) => {

    fastify.post("/api/create-item", (req, res) => {
        const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            type: req.body.type
        });

        item
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    });
}