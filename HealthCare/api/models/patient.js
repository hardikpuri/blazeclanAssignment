const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    PatientId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PatientName: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adhar: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: "adhar"
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Disease: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    WardNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ward',
        key: 'WardId'
      }
    },
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'DoctorId'
      }
    },
    AdmissionDate: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PatientId" },
        ]
      },
      {
        name: "adhar",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "adhar" },
        ]
      },
      {
        name: "FK_patientWardId",
        using: "BTREE",
        fields: [
          { name: "WardNo" },
        ]
      },
      {
        name: "FK_patientDoctorId",
        using: "BTREE",
        fields: [
          { name: "DoctorId" },
        ]
      },
    ]
  });
};
