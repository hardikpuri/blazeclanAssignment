var DataTypes = require("sequelize").DataTypes;
var _medicine = require("./medicine");

function initModels(sequelize) {
  var medicine = _medicine(sequelize, DataTypes);


  return {
    medicine,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
