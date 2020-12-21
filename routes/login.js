import express from "express"
const router = express.Router()
const db = require("../models")
const UserData = db.user;

router.get("/", (req, res) => {
    res.send("here login")
}).post("/", (req, res) => {
    const form_data = req.body;
    if (typeof form_data.username == "undefined") {
        return res.status("403").json({ message: "The username is required" })
    }

    if (typeof form_data.password == "undefined") {
        return res.status("403").json({ message: "The password is required" })
    }

    UserData.findOne({ username: form_data.username }, (err, user) => {
        if (err) throw err;
        console.log(user);

        user.comparePassword(form_data.password, function (err, isMatch) {
            if (err) throw err;
            // console.log(form_data.password);
            if (isMatch) {
                return res.status(200).json({ message: "success Login" })
            } else {
                return res.status(400).json({ message: "Failed login , User / Password not match" })
            }
        });


    })
})

module.exports = router;