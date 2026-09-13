const app = require("../backend/server");

module.exports = (req, res) => {

    req.url = "/profile";

    app.handle(req, res);

};