const express = require('express');
const router = express.Router();
const db = require('../models');

router.put('/profile', function(req, res) {
    console.log('attemting to post');
    db.seller_profile.findOne({
      where: { seller_id : req.user.id}
    //    {
  
        
    //   } 
    }).then((user  =>{
        user.update ({
            seller_id: req.user.id,
            business_name: req.body.business,
            description: req.body.info,
            image: req.body.image,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            open_at: req.body.open,
            closes_at:req.body.close 
        })
      console.log(`Storing your address into the database!!`)
      res.redirect('/profile')
    }))
    
  });
////////////////////////////////////////////////////////////////////
  router.post('/seller_address', function(req, res) {
    console.log('attemting to post');
    db.seller_profile.findOrCreate({
      where: {
        seller_id: req.user.id,
        business_name: req.body.business,
        description: req.body.info,
        image: req.body.image,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        open_at: req.body.open,
        closes_at:req.body.close
        
      } 
    }).then((user  =>{
      console.log(`Storing your address into the database!!`)
      res.redirect('/profile')
    }))
    
  });

  router.delete('/profile', function(req, res) {
    
    db.seller_has.destroy({
      where: {
        type: req.body.type,
        seller_id : req.user.id
      } 
    }).then((it  =>{
      console.log(`Removing ${it.name} from our database.`)
      res.redirect('/profile')
    })).catch((err)=>{
      console.log(err);
    })
  })
  
  module.exports = router;