import express from "express"
import jwt from "jsonwebtoken"
const db = require("../../../models")
const blogData = db.blog;
const router = express.Router()

router.get("/", function (req, res) {
    // res.send("blog list")
    let arr_data = [];
    blogData.find({}, (err, doc) => {
        doc.forEach(element => {
            arr_data.push({ title: element.title, date: element.date, author: element.author })
        });
        res.status(200).json({ message: arr_data })
    })
}).post("/", (req, res) => {
    let token = req.headers.authorization;
    const bearer_value = token.replace("Bearer ", "")
    const form_data = req.body;
    let username = ""
    jwt.verify(bearer_value, process.env.SECRET, (err, decoded) => {
        username = decoded.id
    })
    const new_blog = new blogData({
        author: username,
        title: form_data.title,
        body: form_data.blog
    })

    new_blog.save((err, new_blog) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json({ message: "success created Blog" })
        }
    })


}).get("/:blogId", (req, res) => {
    const params = req.params
    const idblog = params.blogId
    blogData.findOne({ id_blog: idblog }, (err, doc) => {
        if (doc == null) {
            res.status(404).json({ message: "Blog data not found !" })
        } else {
            res.status(200).json({ data: doc, message: "found" })
        }
    })

})

module.exports = router;