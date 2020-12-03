'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seller_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  seller_profile.init({
    seller_id: DataTypes.INTEGER,
    business_name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    open_at: DataTypes.INTEGER,
    closes_at: DataTypes.INTEGER,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'seller_profile',
  });
  return seller_profile;
};