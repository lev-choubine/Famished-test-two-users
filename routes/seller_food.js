const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/profile', function(req, res) {
    db.seller_profile.findOne({
      where: {seller_id: req.user.id }
    }).then(seller =>{
      db.seller_has.findOrCreate({
        where: {
          seller_id: req.user.id,
          seller_name: seller.business_name,
          type_info: req.body.typeInfo,
          type_image: req.body.typeImage,
          type_id: req.body.typeIdd,
          type: req.body.type,
          price: req.body.price, 
          seller_info: seller.description,
          seller_image: seller.image,
          seller_street: seller.street,
          seller_city: seller.city,
          seller_state: seller.state,
          seller_zip: seller.zip,
          seller_open: seller.open_at,
          seller_close: seller.closes_at, 
          seller_website: seller.website
        } 
      }).then((user  =>{
        
        res.redirect('/profile')
      }))

    })
   
    
  });


  module.exports = router;