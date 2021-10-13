const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ward', {
    WardId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    WardName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ward',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "WardId" },
        ]
      },
    ]
  });
};
