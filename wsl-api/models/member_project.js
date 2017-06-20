'use strict';
module.exports = function(sequelize, DataTypes) {
  var Member_Project = sequelize.define('Member_Project', {
    id: DataTypes.INT,
    member_id: DataTypes.INT,
    project_id: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Member_Project;
};