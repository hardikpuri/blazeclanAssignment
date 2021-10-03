var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");

function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);

  users.belongsTo(staff, { as: "StaffNo_staff", foreignKey: "StaffNo"});
  staff.hasOne(users, { as: "user", foreignKey: "StaffNo"});

  return {
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
