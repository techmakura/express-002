require('dotenv').config();

const api_key = process.env.API_KEY;

module.exports = (req, res, next) => {
    console.log(api_key + " api_key");
    const token = req.headers.token;
    if (token !== api_key) {
        return res.status(401).send({ "result": "Unauthorized!!!" });
        // This will return the response to user because token is not valid
    }
    //   This will execute the route because token is valid. 
    next();
};


// Middleware is a function that runs before executing our actual route. 