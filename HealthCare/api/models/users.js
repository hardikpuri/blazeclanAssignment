const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    StaffNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'StaffNo'
      },
      unique: "User_FK"
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "StaffNo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffNo" },
        ]
      },
    ]
  });
};
