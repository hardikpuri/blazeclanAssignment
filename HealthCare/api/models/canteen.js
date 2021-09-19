const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('canteen', {
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'PatientId'
      }
    },
    Items: {
      type: DataTypes.STRING(600),
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'canteen',
    timestamps: false,
    indexes: [
      {
        name: "FK_PatientCanteenBill",
        using: "BTREE",
        fields: [
          { name: "PatientId" },
        ]
      },
    ]
  });
};
