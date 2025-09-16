const express = require('express');
const router = express.Router();
const PublisherModel = require("../model/publisher");
const auth = require("../middleware/auth");

// Get all Publishers(Read)
router.get('/', auth, async (req, res) => {
    try {
        const publishers = await PublisherModel.find({});
        console.log(publishers + " publishers");
        res.status(200).send({ "result": publishers });
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

// Get book that matches provided id
router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const publisher = await PublisherModel.findById(id).exec();
        console.log(publisher + " publisher");
        res.status(200).send({ "result": publisher });
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});
// (Create) a new Publisher
router.post("/", auth, async (req, res) => {
    try {
        const { name, address, isActive  } = req.body;

        const newBook = {
            "name": name,
            "address": address,
            "isActive": isActive
        }
        const Publisher = new PublisherModel(newBook);
        const response = await Publisher.save()
        res.status(201).send({ "message": `Successfully created! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": "This is some error" });
    }
});

// (updated) Update the book with provided id
router.put("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;

        const { name, address, isActive  } = req.body;

        const newPublisher = {
            "name": name,
            "address": address,
            "isActive": isActive
        }

        const response = await PublisherModel.findByIdAndUpdate(
            id,
            { $set: newPublisher },
            { new: true, runValidators: true }
        );

        res.status(200).send({ "message": "Successfully updated!" + response })
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

// (Deleted) the book that matches the provided id
router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const response = await PublisherModel.findByIdAndDelete(id);

        res.status(200).send({ "message": `Successfully Deleted! ${response}` })
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

module.exports = router;