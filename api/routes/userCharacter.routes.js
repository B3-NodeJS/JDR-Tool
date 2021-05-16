const UserCharacter = require("../models/userCharacter.model.js");

module.exports = (fastify) => {

    // Create
    fastify.post("/api/user-character", (req, res) => {
        const userCharacter = new UserCharacter({
            character: req.body.character,
            username: req.body.username,
            discordId: req.body.discordId
        });

        userCharacter
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
    fastify.get("/api/user-characters", (req, res) => {
        UserCharacter
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
    fastify.get("/api/user-character/:userCharacterId", (req, res) => {
        const id = req.params.userCharacterId;

        UserCharacter
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
    fastify.patch("/api/user-character/:userCharacterId", (req, res) => {
        const id = req.params.userCharacterId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        UserCharacter
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
    fastify.delete("/api/user-character/:userCharacterId", (req, res) => {
        const id = req.params.userCharacterId;

        UserCharacter
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
    fastify.delete("/api/user-characters", (req, res) => {
        UserCharacter
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