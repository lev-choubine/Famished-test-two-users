const db = require('./models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const type = 'Taco';
const price = 5;




  //!!!!LESS THAN -   where: {price:{[Op.lte] : 9}},!!!!!

  /* 
$gt: Greater than // soon to be replaced by [Op.gt]
$gte: Greater than or equal // soon to be replaced by [Op.gte]
$lt: Less than // soon to be replaced by [Op.lt]
$lte: Less than or equal // soon to be replaced by [Op.lte]
$ne: Not equal // soon to be replaced by [Op.ne]
$eq: Equal // soon to be replaced by [Op.eq]
$or: Use or logic for multiple properties // soon to be replaced by [Op.or]
  */