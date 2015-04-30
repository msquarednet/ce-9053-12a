var User = require("../models/models").User;
var jwt = require("jwt-simple");

var authorize = function(req, res, next){
  try{
    var decoded = jwt.decode(req.params.token, process.env.JWT_SECRET);
    User.findById(decoded._id, function(err, user){
      next();
    });
  }
  catch(ex){
    res.status(401).send({error: "You must be authorized for this action"});
  }
};

module.exports = {
    authorize: authorize
};