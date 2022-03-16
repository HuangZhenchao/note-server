let r = require("./r"),
    c = require("./c"),
    u = require("./u"),
    d = require("./d"),
    upload=require("./upload")
module.exports = function(app){
    c(app)
    u(app);
    r(app);
    d(app);
    upload(app)
}