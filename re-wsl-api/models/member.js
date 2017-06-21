'use strict';
module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define('member', {
    name: DataTypes.STRING,
    grade_id: DataTypes.INTEGER,
    mail_address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Member;
};
