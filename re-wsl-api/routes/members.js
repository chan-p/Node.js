var express = require('express');
var models  = require('../models');
var async   = require('async');

var router = express.Router();

router.get('/data/member_add', function(req, res){
  var newName    = req.query.name;
  var newGrade   = req.query.grade;
  var newMailAdd = req.query.mail_address;
  var newProject = req.query.project;
  console.log(newMailAdd);
  async.waterfall([
    function(callback){
      models.grade
        .find({attributes:['id'], where:{name: newGrade}})
        .then(function(grade){
          models.member
            .create({name: newName, grade_id: grade.id, mail_address: newMailAdd})
            .then(function(member){
              callback(null, member.id);
            });
        });
    },
    function(member_id, callback){
      models.project
        .find({attributes:['id'], where:{name: newProject}})
        .then(function(project){
          models.member_project
            .create({member_id: member_id, project_id: project.id})
            .then(function(){
              callback(null);
            });
        });
    }
  ],
    function(err, results){
      if(err){
        throw err;
      }
    });
  res.json({'msg':'sucess'});
});

router.get('/data/member_delete', function(req, res){
  res.json({a:"a"});
});

router.get('/data/member_update', function(req, res){
  res.json({a:"a"});
});

module.exports = router;
