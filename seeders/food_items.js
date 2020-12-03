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
      },
      { type: 'Pizza',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { type: 'Pasta',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { type: 'Burgers',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { type: 'Hot_Dogs',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { type: 'Smoothies',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { type: 'Crepes',
    createdAt: new Date(),
    updatedAt: new Date()
  }
    ], { returning: true })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items', null, {})
  }
}



