const express = require("express");

const app = express();

app.use(express.static('public'))

app.get("/", (req, res)=> {
    res.send({"message": "Hello world!!!"});
})

app.get("/contact", (req, res)=> {
    res.send({"message": "Hello contact!!!"});
})

app.get("/about", (req, res)=> {
    res.send({"message": "Hello About!!!"});
})

app.listen(8000, ()=> {
    console.log("Listening at port 8000")
})

