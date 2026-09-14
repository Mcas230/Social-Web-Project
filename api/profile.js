const app = require("../backend/server");

module.exports = (req, res) => {

    if (req.url.includes("?")) {
        req.url = "/profile" + req.url.substring(req.url.indexOf("?"));
    } else {
        req.url = "/profile";
    }

    app.handle(req, res);

};