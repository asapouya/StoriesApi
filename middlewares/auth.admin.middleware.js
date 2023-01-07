const ClientError = require("../controllers/response_objects/4xx");

module.exports = function(req,res,next){
    if(req.user.admin) return next();
    res.status(401).send(ClientError[401]());
}