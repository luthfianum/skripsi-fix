/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('option', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      pertanyaanId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      option: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    })
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('option');
  },
};