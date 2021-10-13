const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discharge', {
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
      allowNull: false
    },
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'discharge',
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
    ]
  });
};
