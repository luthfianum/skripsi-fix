/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('pertanyaan', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      kuisionerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pertanyaan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipe: {
        type: DataTypes.STRING,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      master: {
        type: DataTypes.BOOLEAN,
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
    return queryInterface.dropTable('pertanyaan');
  },
};