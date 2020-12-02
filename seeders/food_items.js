'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('seller_profiles', [
      { seller_id: 2,
        business_name: "Yuichi's Pizza",
        description: "Authentinc Japanese Pizza Trucks",
        image: "My Pic Here",
        street: "180 Ludlow Street",
        city: "New York",
        state: "NY",
        zip: 10002,
        open_at: 1,
        closes_at: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authors', null, {})
  }
}