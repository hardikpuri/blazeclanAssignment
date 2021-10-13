const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charges', {
    Item: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    charges: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'charges',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Item" },
        ]
      },
    ]
  });
};
