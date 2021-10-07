const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicine', {
    medicineId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medicineName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    medicineType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    manufacturerName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    manufactureDate: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    hospitalInwardDate: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicine',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "medicineId" },
        ]
      },
    ]
  });
};
