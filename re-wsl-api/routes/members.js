var express = require('express');
var models  = require('../models');
var async   = require('async');

var router = express.Router();

router.get('/data/member_add', function(req, res){
  var newName    = req.query.name;
  var newGrade   = req.query.grade;
  var newMailAdd = req.query.mail_address;
  var newProject = req.query.team;
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
    }
  );
  res.json({'msg':'success'});
});

router.get('/data/member_delete', function(req, res, callback){
  var targetName = req.query.name;
  models.member
    .find({where:{name: targetName}})
    .then(function(member){
      models.member
        .destroy({where:{id: member.id, name: targetName}});
      models.member_project
        .destroy({where:{member_id: member.id}});
    })
    .then(function(){
      res.json({'msg':'success'});
    })
    .catch(function(err){
      res.json({'msg':'not exist'});
    });
});

router.get('/data/member_update', function(req, res){
  var targetName = req.query.name;
  var newName    = req.query.new_name;
  var newGrade   = req.query.new_grade;
  var newProject = req.query.new_project;
  var newMailAdd = req.query.new_mail_address;

  async.waterfall([
    function(callback){
      models.member
        .find({attributes:['id', 'mail_address'], where: {name: targetName}})
        .then(function(member){
          callback(null, member.id, member.mail_address);
        });
    },
    function(memberId, memberAddress, callback){
      models.member_project
        .find({where:{member_id: memberId}})
        .then(function(member_project){
          if(newProject != null){
            models.project
              .find({attributes:['id'], where:{name:newProject}})
              .then(function(project){
                models.member_project
                  .update({project_id: project.id}, {where:{id: member_project.id}});
              });
          }
          callback(null, memberId, memberAddress);
        });
    },
    function(memberId, memberAddress, callback){
      var mailAddress = (newMailAdd == null) ? memberAddress : newMailAdd;
      var name = (newName == null) ? targetName : newName;
      if(newGrade != null){
        models.grade
          .find({attributes:['id'], where:{name:newGrade}})
          .then(function(grade){
            models.member
              .update({name: name, grade_id: grade.id, mail_address: mailAddress}, {where:{id: memberId}});
            callback(null);
          });
      } else {
        models.member
          .update({name: name, mail_address: mailAddress}, {where:{id: memberId}})
          .then(function(member){
            callback(null);
          });
      }
    }
  ],
    function(err, results){
      if(err){
        throw err;
      }
    }
  );
  res.json({'msg':'success'});
});

module.exports = router;
