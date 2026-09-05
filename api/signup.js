const app = require("../backend/server");

app.post("/api/signup", (req, res, next) => {

    req.url = "/signup";

    app.handle(req, res, next);

});

module.exports = app;