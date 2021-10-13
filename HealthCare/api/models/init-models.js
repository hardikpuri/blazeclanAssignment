var DataTypes = require("sequelize").DataTypes;
var _discharge = require("./discharge");

function initModels(sequelize) {
  var discharge = _discharge(sequelize, DataTypes);


  return {
    discharge,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
