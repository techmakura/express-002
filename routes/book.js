const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require("path");
const BookModel = require("../model/book");
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

// Get all books(Read)
router.get('/', auth, async (req, res) => {
    try {
        const books = await BookModel.find({});
        console.log(books + " books");
        res.status(200).send({ "result": books });
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

// Get book that matches provided id
router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const books = await BookModel.findById(id).exec();
        console.log(books + " books");
        res.status(200).send({ "result": books });
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

// (Create) a new book
router.post("/", auth, upload.single('image'), async (req, res) => {
    try {
        const { title, pages, price, language, published_year } = req.body;
        const image = req.file.filename;

        const newBook = {
            "title": title,
            "pages": pages,
            "price": price,
            "language": language,
            "published_year": published_year,
            "cover_image": image
        }
        const Books = new BookModel(newBook);
        const response = await Books.save()
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

        const { title, pages, price, language, published_year } = req.body;

        const newBook = {
            "title": title,
            "pages": pages,
            "price": price,
            "language": language,
            "published_year": published_year
        }

        const response = await BookModel.findByIdAndUpdate(
            id,
            { $set: newBook },
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
        const response = await BookModel.findByIdAndDelete(id);

        res.status(200).send({ "message": `Successfully Deleted! ${response}` })
    } catch (err) {
        res.status(500).send({ "Error": "This is some error" });
    }
});

module.exports = router;