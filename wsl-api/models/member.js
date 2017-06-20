// 'use strict';
var Sequelize = require("sequelize");
/**
var sequelize = new Sequelize("db01", "root", "tomohi6", {
  host: "db01.wsl.mind.meiji.ac.jp",
  dialect: "mysql"
});
**/
var sequelize = new Sequelize('mysql://root:tomohi6@db01.wsl.mind.meiji.ac.jp:3306/wsl_member_table_A');

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define('Member', {
    id: DataTypes.INTEGER,
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
/**
var Member = sequelize.define('Member', {
  // id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  grade_id: Sequelize.INTEGER,
  mail_address: Sequelize.STRING
});
**/
//exports.Member = Member;
