'use strict'
module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('users', [
        { name: 'Lev Choubine',
          email: 'lev.choubine@gmail.com',
          password: '$2b$12$3HfeHDFs.MY1P1oBMwo30.jkW3ZB30.NZ.YTFYghgmO5Xrxj.geeC',
          createdAt: new Date(),
          updatedAt: new Date()
        },
  
     
      ], { returning: true })
    },
  
    down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('users', null, {})
    }
  }