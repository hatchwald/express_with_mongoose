// config to route API 
module.exports = function (app) {
    // app.use("/login", require("./api/login"));
    app.use("/api", require("./api"))
}