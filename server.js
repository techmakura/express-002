const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoute = require("./routes/book");

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/mern')
    .then(() => {
        console.log('Connected with mongodb!')
        
        app.listen(8000, () => {
            console.log("Listening at port 8000")
        })
    })
    .catch(error => console.log(error));

app.use("/books", bookRoute);



