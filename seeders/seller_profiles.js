'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('seller_profiles', [
        { seller_id: 1,
          business_name: "Bob's Hot Dogs",
          description: 'New York Style Hot Dogs',
          image: 'http://res.cloudinary.com/dok4pz3i3/image/upload/v1607023618/fsdfskr4lppp6d8yukve.jpg',
          street: '450 St Nicholas Avenue',
          city: 'New York',
          state: 'NY',
          zip: 10027,
          open_at: 2,
          closes_at: 5,
          website: 'www.bobshotdogs.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
  
     
      ], { returning: true })
    },
  
    down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('seller_profiles', null, {})
    }
  }