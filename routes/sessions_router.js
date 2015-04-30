var express = require("express");
var jwt = require("jwt-simple");
var User = require("../models/models").User;

var app = express.Router();

app.get("/:token", function(req, res){
  try{
    var decoded = jwt.decode(req.params.token, process.env.JWT_SECRET);
    User.findById(decoded._id, function(err, user){
      res.send(user); 
    });
  }
  catch(ex){
    res.status(401).send({error: "problem with token"}); 
  }
});

app.post("/", function(req, res){
  if(!req.body.password) 
    return res.status(500).send({error: "No password??"});
  User.findOne(req.body, function(err, user){
    if(user){
      var _user = {
        _id: user._id
      };
      return res.send(jwt.encode(_user, process.env.JWT_SECRET));
    }
    else
      return res.status(401).send({"error": "no user found"});
  }); 
});

module.exports = app;