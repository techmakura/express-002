const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    age: Number,
    country: String,
    avatar: String,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    phone: Number,
    email: String
});

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;
