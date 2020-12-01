const db = require('./models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const type = 'Taco';
const price = 5;


app.get('/profile/finds',(req,res)=>{
    db.user_profile.findOne({
      where: {user_id : req.user.id}
    })
    .then(
      prof => {
        let street = JSON.stringify(prof.street)
        let city = JSON.stringify(prof.city)
        let state = JSON.stringify(prof.state)
        let zip = JSON.stringify(prof.zip)
        
  ////////////////////////////////////////////////////////////////////////
  db.items.findAll().then(finds => {
   let find = finds
   db.user_wants.findAll({
    where: {user_id : req.user.id}
  }).then(picks=>{
   
    let pick = picks
    ////////////////////////////////////////////////
    db.seller_has.findAll({
      where: {type:'Taco', price:{[Op.lte] : 5}}
  })
  .then(finds => {
  let find = finds
  console.log('!!!!!!!!!!'+JSON.stringify(picks))
  res.render('finds', {pass: req.user.name, street, city, state, zip, find, pick, find})
  }
  
  )
  .catch(console.error)
  ///////////////////////////////////////////////////////////////
   
  })
  }
  /////////////////////////////////////////////////////////////////////////
  )
  ///////////////////////////////////////////////////////////////////////
  
  /////////////////////////////////////////////////////////////////////////
  
    
  })
    .catch(err=>{console.log(err)})
    
    
    
  })

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