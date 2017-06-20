'use strict';
module.exports = function(sequelize, DataTypes) {
  var Grade = sequelize.define('Grade', {
    id: DataTypes.INT,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Grade;
};