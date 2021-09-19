var DataTypes = require("sequelize").DataTypes;
var _role = require("./role");
var _user = require("./user");
var _userinrole = require("./userinrole");

function initModels(sequelize) {
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userinrole = _userinrole(sequelize, DataTypes);

  userinrole.belongsTo(role, { as: "role", foreignKey: "roleid"});
  role.hasMany(userinrole, { as: "userinroles", foreignKey: "roleid"});
  userinrole.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasOne(userinrole, { as: "userinrole", foreignKey: "userid"});

  return {
    role,
    user,
    userinrole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
