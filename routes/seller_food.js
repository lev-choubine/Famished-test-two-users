const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/profile', function(req, res) {
    
    db.seller_has.findOrCreate({
      where: {
        seller_id: req.user.id,
        seller_name: req.body.sellerName,
        type_info: req.body.typeInfo,
        type_image: req.body.typeImage,
        type_id: req.body.typeIdd,
        type: req.body.type,
        price: req.body.price 
      } 
    }).then((user  =>{
      
      res.redirect('/profile')
    }))
    
  });


  module.exports = router;