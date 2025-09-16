const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    title: String
});

const GenreModel = mongoose.model("Genre", genreSchema);

module.exports = GenreModel;

