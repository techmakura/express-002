const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const AuthorModel = require("../model/author");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
  });
  
  const upload = multer({ storage: storage });

// Get all authors(Read)
router.get('/', auth, async (req, res) => {
    try {
        const authors = await AuthorModel.find({});
        console.log(authors + " authors");
        res.status(200).send(authors);
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

// Get author that matches provided id
router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const author = await AuthorModel.findById(id).exec();
        console.log(author + " author");
        res.status(200).send({ "result": author });
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});
// (Create) a new Author
router.post("/", upload.single('image'), auth, async (req, res) => {
    try {
        const { name, age, country, gender, phone, email  } = req.body;
        const image = req.file? req.file.filename : "";

        const newAuthor = {
            "name": name,
            "age": age,
            "country": country,
            "gender": gender,
            "phone": phone,
            "email": email,
            "avatar": image
        }

        const Author = new AuthorModel(newAuthor);
        const response = await Author.save()
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

        const response = await AuthorModel.findByIdAndUpdate(
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
        const response = await AuthorModel.findByIdAndDelete(id);

        res.status(200).send({ "message": `Successfully Deleted! ${response}` })
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

module.exports = router;