'use strict';

const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  seller.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'seller',
  });
  seller.addHook('beforeCreate', function(pendingSeller) {
    // Bcrypt hash a password for us
    let hash = bcrypt.hashSync(pendingSeller.password, 12);
    // Set password to equal the hash
    pendingSeller.password = hash;
    console.log(pendingSeller)
  });
  
  seller.prototype.validPassword = function(passwordTyped) {
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);
    console.log('Inside of validPassword', correctPassword)
    // return true or false based on correct password or not
    return correctPassword;
  }
  
  // Remove the password before it gets serialized 
  seller.prototype.toJSON = function() {
    console.log('Inside of toJSON method')
    let sellerData = this.get();
    delete sellerData.password;
    return sellerData;
  }
  return seller;
};