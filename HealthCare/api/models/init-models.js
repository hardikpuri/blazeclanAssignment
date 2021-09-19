var DataTypes = require("sequelize").DataTypes;
var _canteen = require("./canteen");
var _doctor = require("./doctor");
var _nurse = require("./nurse");
var _patient = require("./patient");
var _rooms = require("./rooms");
var _staff = require("./staff");
var _ward = require("./ward");
var _wardboy = require("./wardboy");

function initModels(sequelize) {
  var canteen = _canteen(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);
  var nurse = _nurse(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var rooms = _rooms(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var ward = _ward(sequelize, DataTypes);
  var wardboy = _wardboy(sequelize, DataTypes);

  patient.belongsTo(doctor, { as: "Doctor", foreignKey: "DoctorId"});
  doctor.hasMany(patient, { as: "patients", foreignKey: "DoctorId"});
  canteen.belongsTo(patient, { as: "Patient", foreignKey: "PatientId"});
  patient.hasMany(canteen, { as: "canteens", foreignKey: "PatientId"});
  doctor.belongsTo(staff, { as: "StaffNo_staff", foreignKey: "StaffNo"});
  staff.hasMany(doctor, { as: "doctors", foreignKey: "StaffNo"});
  nurse.belongsTo(staff, { as: "StaffNo_staff", foreignKey: "StaffNo"});
  staff.hasMany(nurse, { as: "nurses", foreignKey: "StaffNo"});
  wardboy.belongsTo(staff, { as: "StaffNo_staff", foreignKey: "StaffNo"});
  staff.hasMany(wardboy, { as: "wardboys", foreignKey: "StaffNo"});
  nurse.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(nurse, { as: "nurses", foreignKey: "WardNo"});
  patient.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(patient, { as: "patients", foreignKey: "WardNo"});
  rooms.belongsTo(ward, { as: "Ward", foreignKey: "WardId"});
  ward.hasMany(rooms, { as: "rooms", foreignKey: "WardId"});
  wardboy.belongsTo(ward, { as: "WardNo_ward", foreignKey: "WardNo"});
  ward.hasMany(wardboy, { as: "wardboys", foreignKey: "WardNo"});

  return {
    canteen,
    doctor,
    nurse,
    patient,
    rooms,
    staff,
    ward,
    wardboy,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
