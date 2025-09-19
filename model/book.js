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
    },
    cover_image: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    }
}, { timestamps: true });

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;

