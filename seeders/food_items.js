'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [
      { type: 'Ramen',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { type: 'Sushi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { type: 'Halal',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authors', null, {})
  }
}