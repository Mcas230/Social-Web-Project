const app = require("../backend/server");

module.exports = (req, res) => {

    req.url = "/profile" + req.url.substring(req.url.indexOf("?"));

    app.handle(req, res);

};