import express from "express"
const router = express.Router()
const db = require("../models")
import jwt from "jsonwebtoken"
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
        if (user == null) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        if (err) throw err;
        // console.log(user);

        user.comparePassword(form_data.password, function (err, isMatch) {
            if (err) throw err;
            // console.log(form_data.password);
            if (isMatch) {
                const token = jwt.sign({ id: form_data.username }, process.env.SECRET, {
                    expiresIn: 86400
                })

                return res.status(200).json({
                    message: "success Login",
                    username: form_data.username,
                    token: token
                })
            } else {
                return res.status(400).json({ message: "Failed login , User / Password not match" })
            }
        });


    })
})

module.exports = router;