var express = require('express');
var router = express.Router();
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
// const ObjectID = Schema.ObjectId;
const user_format = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

user_format.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  })
})
const UserData = mongoose.model('user', user_format)

async function ConnectMongo() {
  // connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

}

/* GET users listing. */
router.get('/', function (req, res, next) {

  res.send('respond with a resource');
});

router.post('/', function (req, res) {
  const form_data = req.body;

  ConnectMongo()
  const db = mongoose.connection;
  // db.on('error', res.send("Error Connection to DB"));

  const new_user = new UserData({
    username: form_data.username,
    password: form_data.password
  })

  new_user.save((err, new_user) => {
    if (err) {
      if (err.code === 11000) {
        res.status(400).json({ message: "The username already exist" })
      } else {
        res.status(500).send(err)
        console.log(err);
      }

    } else {
      res.status(200).json({ message: "success created data" })
    }
  })


})

module.exports = router;
