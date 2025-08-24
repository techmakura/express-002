const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    title: String
});

const GenreModel = mongoose.model("genre", genreSchema);

module.exports = GenreModel;

