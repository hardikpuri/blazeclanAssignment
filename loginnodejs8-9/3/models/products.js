const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    ProductId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProductName: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    CategoryName: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    Manufacture: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProductId" },
        ]
      },
    ]
  });
};
