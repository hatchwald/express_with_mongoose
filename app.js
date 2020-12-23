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

var app = express();


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
    console.error("Connection error", err);
    process.exit();
});
module.exports = app;
