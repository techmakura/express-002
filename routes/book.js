const express = require('express');
const router = express.Router();
const BookModel = require("../model/book");

// Get all books(Read)
router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find({});

        console.log(books + " books");
        res.send({ "result": books });
    } catch (err) {
        res.send({"Error": "This is some error"});
    }
});

// Get book that matches provided id
router.get('/:id', (req, res) => {

    res.send({ "result": "THis will return the book that matches the id" });
});

// (Create) a new book
router.post("/", (req, res) => {
    const { username, email, password } = req.body;
    console.log("Username: " + username + " password: " + password + " email: " + email)

    res.send({ "message": "Successfully created!" })
});

// (updated) Update the book with provided id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id + " id")
    const q = req.query.q;
    const token = req.headers.token;
    res.send({ "message": "Successfully updated! id: " + token })
});

// (Deleted) the book that matches the provided id
router.delete("/:id", (req, res) => {
    res.send({ "message": "Successfully Deleted!" })
});

module.exports = router;