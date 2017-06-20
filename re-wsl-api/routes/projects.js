var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/show/team_member_count', function(req, res, next){
  var team_name = req.query.team;
  models.project.find({attributes:['id'], where:{name: team_name}})
    /**
    .error(function(err){
      res.json({'msg': "not found input_team_name"});
      console.log(err);
    })
    **/
    .then(function(project){
      models.member_project
        .findAll({attributes:['member_id'], where:{project_id: project.id}})
        .then(member_project => {
          res.json({'projectmembercount': member_project.length});
        });
    });
});

module.exports = router;
