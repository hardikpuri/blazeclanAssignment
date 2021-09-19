const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    PatientId: {
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
