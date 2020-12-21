var express = require('express');
var router = express.Router();

const db = require("../models")

const UserData = db.user;


/* GET users listing. */
router.get('/', function (req, res, next) {

  res.send('respond with a resource');
});

router.post('/', function (req, res) {
  const form_data = req.body;

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
