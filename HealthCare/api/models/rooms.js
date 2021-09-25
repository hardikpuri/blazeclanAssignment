const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    RoomNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RoomType: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    WardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ward',
        key: 'WardId'
      }
    }
  }, {
    sequelize,
    tableName: 'rooms',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoomNo" },
        ]
      },
      {
        name: "FK_WardId",
        using: "BTREE",
        fields: [
          { name: "WardId" },
        ]
      },
    ]
  });
};
