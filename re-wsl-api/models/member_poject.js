'use strict';
module.exports = function(sequelize, DataTypes) {
  var member_project = sequelize.define('member_project', {
    member_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return member_project;
};
