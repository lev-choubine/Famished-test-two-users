'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('seller_profiles', [
      { seller_id: 1,
        business_name: "Lev's Chicken Feet",
        description: "Authentinc Non-exsistant cuisine",
        image: "My Pic Here",
        street: "430 St Nicholas Ave",
        city: "New York",
        state: "NY",
        zip: 10027,
        open_at: 2,
        closes_at: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authors', null, {})
  }
}