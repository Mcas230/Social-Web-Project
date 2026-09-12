const app = require("../backend/server"); 
 
app.post("/api/login", (req, res, next) => { 
    req.url = "/login"; 
    app.handle(req, res, next); 
}); 
 
module.exports = app;