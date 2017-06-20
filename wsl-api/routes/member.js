var express = require("express");
var models = require("../models");

var router = express.Router();

router.get("/test/:member_id", function(req, res){
  models.Member
    .findOne({where: {id: req.paramas.member_id}})
    .then(function(results){
      res.json(results);
    });
});
