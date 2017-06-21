var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/show/team_member_count', function(req, res, next){
  var team_name = req.query.team;
  console.log('/show/team_member_count');
  models.project
    .find({attributes:['id'], where:{name: team_name}})
    .then(function(project){
      models.member_project
        .findAll({attributes:['member_id'], where:{project_id: project.id}})
        .then(function(member_project){
          res.json({'projectmembercount': member_project.length});
        });
    })
    .catch(function(err){
      res.json({'msg':'not exist'});
    });
});

module.exports = router;
