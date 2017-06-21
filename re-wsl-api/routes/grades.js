var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/show/grade_all', function(req, res, next){
  var grade_name = req.query.grade;
  console.log('/show/grade_all', grade_name);
  models.grade
    .find({attributes:['id'], where:{name: grade_name}})
    .then(function(grade){
      models.member
        .findAll({attributes:['name'], where:{grade_id: grade.id}})
        .then(function(member){
          member_list = [];
          member.forEach(function(men){
            member_list.push(men.get('name'));
          });
          res.json({'name': member_list});
        });
    })
    .catch(function(err){
      res.json({'msg':'not'});
    });
 });


module.exports = router;
