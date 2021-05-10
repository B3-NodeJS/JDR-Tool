const Item = require("../models/item.model.js");

module.exports = (fastify) => {

    // Create
    fastify.post("/api/item", (req, res) => {
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type
        });

        item
            .save()
            .then(result => {
                console.log(result);
                res.send(200);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // FindAll
    fastify.get("/api/items", (req, res) => {
        Item
            .find()
            .exec()
            .then(result => {
                console.log(result);
                res.send(200);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // Find
    fastify.get("/api/item/:itemId", (req, res) => {
        const id = req.params.itemId;

        Item
            .findById(id)
            .exec()
            .then(result => {
                console.log(result);
                res.send(200);
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
    fastify.patch("/api/item/:itemId", (req, res) => {
        const id = req.params.itemId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Item
            .update({ _id: id }, { $set: updateOps })
            .exec()
            .then(result => {
                console.log(result);
                res.send(200);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // Delete
    fastify.delete("/api/item/:itemId", (req, res) => {
        const id = req.params.itemId;

        Item
            .remove({ _id: id })
            .exec()
            .then(result => {
                console.log(result);
                res.send(200);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });

    // DeleteAll
    fastify.delete("/api/items", (req, res) => {
        Item
            .remove({})
            .exec()
            .then(result => {
                console.log(result);
                res.send(200);
            })
            .catch(err => {
                console.log(err);
                res.send(500);
            });
    });
}