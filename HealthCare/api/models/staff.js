const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    StaffNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StaffName: {
      type: DataTypes.STRING(400),
      allowNull: false
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
    ]
  });
};
