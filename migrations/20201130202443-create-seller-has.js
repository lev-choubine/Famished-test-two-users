'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('seller_has', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seller_id: {
        type: Sequelize.INTEGER
      },
      seller_name: {
        type: Sequelize.STRING
      },
      type_info: {
        type: Sequelize.STRING
      },
      type_image: {
        type: Sequelize.STRING
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
    seller_info: {
      type: Sequelize.STRING
    },
    seller_image: {
      type: Sequelize.STRING
    },
    seller_street: {
      type: Sequelize.STRING
    },
    seller_city: {
      type: Sequelize.STRING
    },
    seller_state: {
      type: Sequelize.STRING
    },
    seller_zip: {
      type: Sequelize.INTEGER
    },
    seller_open: {
      type: Sequelize.INTEGER
    },
    seller_close: {
      type: Sequelize.INTEGER
    },
    seller_website: {
      type: Sequelize.STRING
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('seller_has');
  }
};