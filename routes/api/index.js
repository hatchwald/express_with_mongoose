const ApiRouter = require("express").Router();
import jwt from "jsonwebtoken"

ApiRouter.all('/*', (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    const bearer_value = token.replace("Bearer ", "")
    jwt.verify(bearer_value, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
    })
    next()
})
ApiRouter.use("/login", require("./login"));
ApiRouter.use("/blog", require("./blog"));
module.exports = ApiRouter;