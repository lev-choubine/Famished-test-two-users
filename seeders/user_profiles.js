'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('user_profiles', [
        { user_id: 1,
          name: 'Lev Choubine',
          street: '420 St Nicholas Avenue',
          city: 'New York',
          state: 'NY',
          zip: 10027,
          createdAt: new Date(),
          updatedAt: new Date()
        },
  
     
      ], { returning: true })
    },
  
    down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('user_profiles', null, {})
    }
  }