'use strict';
module.exports = function(sequelize, DataTypes) {
  var grade = sequelize.define('grade', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return grade;
};