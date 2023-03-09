import "babel-polyfill"
require("dotenv").config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const apiRoute = require('./routes/config')
const loginRoute = require('./routes/login')
// setup routes for api
var fs = require("fs")
var app = express();

// log only 4xx and 5xx responses to console
app.use(logger('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
require("./routes/config")(app)
app.use('/login', loginRoute)

const db = require("./models")

db.mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
}).catch(err => {
    if(err) throw err
    console.error("Connection error", err);
    (req,res) => {
        req.error = err
        res.send("cant connect mongo")
    }
    process.exit();
});
module.exports = app;
