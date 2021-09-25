const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    StaffNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    adhar: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: "adhar"
    },
    emailid: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Designation: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffNo" },
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
