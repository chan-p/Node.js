var express = require("express");
var main = express();

var members = require("./models/member");

var server = main.listen(3000, function(){});

main.use("/members", members);
/**
app.get("/api/data/member_add",function(req, res, next){
  return;
});

app.get("/api/data/member_delete", function(req, res, next){
  return;
});

app.get("/api/data/member_upadate", function(req, res, next){
  return;
});

app.get("/api/show/grade_all", function(req, res, next){
  return;
});

app.get("/api/show/team_member_count", function(req, res, next){
  return;
});

app.get("/api/show/address_count", function(req, res, next){
  return;
});
**/
module.exports = main;
