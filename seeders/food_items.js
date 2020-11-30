'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [
      { type: 'Burger',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { type: 'Taco',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { type: 'Pizza',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authors', null, {})
  }
}