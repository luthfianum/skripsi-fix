/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('mahasiswa', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nim: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studi: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      angkatan: {
        type: DataTypes.STRING,
      },
      kelahiran: {
        type: DataTypes.STRING,
      },
      provinsi: {
        type: DataTypes.STRING,
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
    return queryInterface.dropTable('mahasiswa');
  },
};