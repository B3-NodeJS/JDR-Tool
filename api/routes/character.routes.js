const Character = require("../models/character.model.js");

module.exports = (fastify) => {

    // Create
    fastify.post("/api/character", (req, res) => {
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
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // FindAll
    fastify.get("/api/characters", (req, res) => {
        Character
            .find()
            .exec()
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // Find
    fastify.get("/api/character/:characterId", (req, res) => {
        const id = req.params.characterId;

        Character
            .findById(id)
            .exec()
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // Update
    /*
        The body of the update request should look like this :
        [
            {
                "propName": "",
                "value": ""
            }
        ]
    */
    fastify.patch("/api/character/:characterId", (req, res) => {
        const id = req.params.characterId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Character
            .update({ _id: id }, { $set: updateOps })
            .exec()
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // Delete
    fastify.delete("/api/character/:characterId", (req, res) => {
        const id = req.params.characterId;

        Character
            .remove({ _id: id })
            .exec()
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // DeleteAll
    fastify.delete("/api/characters", (req, res) => {
        Character
            .remove({})
            .exec()
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });
}