'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seller_has extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  seller_has.init({
    seller_id: DataTypes.INTEGER,
    seller_name: DataTypes.STRING,
    type_info: DataTypes.STRING,
    type_image: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
        msg: 'please enter a numer'
      }
    }
  },
    /////////////////////////
    seller_info: DataTypes.STRING,
    seller_image: DataTypes.STRING,
    seller_street: DataTypes.STRING,
    seller_city: DataTypes.STRING,
    seller_state: DataTypes.STRING,
    seller_zip: DataTypes.INTEGER,
    seller_open: DataTypes.INTEGER,
    seller_close: DataTypes.INTEGER, 
    seller_website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'seller_has',
  });
  return seller_has;
};