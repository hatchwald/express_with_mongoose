import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("here login it is")
})

module.exports = router;