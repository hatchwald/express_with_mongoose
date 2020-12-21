const ApiRouter = require("express").Router();

ApiRouter.use("/login", require("./login"));

module.exports = ApiRouter;