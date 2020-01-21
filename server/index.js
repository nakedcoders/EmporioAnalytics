const express = require('express')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const cors = require('cors');

const user = require("./routes/user"); //new addition
const Redis = require('./middleware/redis')


// Set Limitrequest
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 15 * (60 * 1000), // 15 minutes, (60 * 1000) 1 minute
    message: 'Too many requests' // message to send
});

// PORT
const PORT = process.env.PORT || 3001;

// Initiate Server App
const app = express()

// Initiate Mongo Server
InitiateMongoServer();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json({ limit: '10kb' })); // Body limit is 10
app.options('*', cors());


app.use('/user', limit); // Setting limiter on specific route
app.use("/user", user);


if(!module.parent){
    app.listen(PORT, () => console.log(`Server Node running on ${PORT}!`))
}

Redis.on('connect', function() {console.log('Redis client connected');});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Server" });
});

module.exports = app
