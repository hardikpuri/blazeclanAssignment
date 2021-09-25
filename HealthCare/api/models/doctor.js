const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctor', {
    DoctorId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Specialization: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    Experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StaffNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'StaffNo'
      }
    }
  }, {
    sequelize,
    tableName: 'doctor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DoctorId" },
        ]
      },
      {
        name: "FK_StaffNo",
        using: "BTREE",
        fields: [
          { name: "StaffNo" },
        ]
      },
    ]
  });
};
