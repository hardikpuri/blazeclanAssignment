var DataTypes = require("sequelize").DataTypes;
var _discharge = require("./discharge");
var _patient = require("./patient");

function initModels(sequelize) {
  var discharge = _discharge(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);

  patient.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(patient, { as: "patients", foreignKey: "DoctorId"});
  patient.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(patient, { as: "patients", foreignKey: "WardNo"});

  return {
    discharge,
    patient,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
