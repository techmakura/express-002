const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    pages: Number,
    price: Number,
    published_year: Date,
    language: {
        type: String,
        enum: ["eng", "nep"]
    }
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;

