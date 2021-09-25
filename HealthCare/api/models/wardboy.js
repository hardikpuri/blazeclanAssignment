const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wardboy', {
    WardBoyId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StaffNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'StaffNo'
      }
    },
    WardNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ward',
        key: 'WardId'
      }
    }
  }, {
    sequelize,
    tableName: 'wardboy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "WardBoyId" },
        ]
      },
      {
        name: "FK_WardBoyStaffId",
        using: "BTREE",
        fields: [
          { name: "StaffNo" },
        ]
      },
      {
        name: "FK_WardBoyWardNo",
        using: "BTREE",
        fields: [
          { name: "WardNo" },
        ]
      },
    ]
  });
};
