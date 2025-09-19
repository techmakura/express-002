const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    name: String,
    address: String,
    isActive: Boolean
}, { timestamps: true });

const PublisherModel = mongoose.model("Publisher", publisherSchema);

module.exports = PublisherModel;

// Author
// Name, age, country, avatar, gender, phone, email