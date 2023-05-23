/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('kuisioner', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      mahasiswaId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.STRING,
      },
      metode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'simple',
      },
      responden: {
        type: DataTypes.INTEGER,
      },
      expiredAt: {
        type: DataTypes.DATE,
      },
      penyebaran: {
        type: DataTypes.INTEGER,
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
    return queryInterface.dropTable('kuisioner');
  },
};