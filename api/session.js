const app = require("../backend/server");

app.get("/api/session", (req, res, next) => {
    req.url = "/session";
    app.handle(req, res, next);
});

module.exports = app;