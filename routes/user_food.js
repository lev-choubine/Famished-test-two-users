const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/profile', function(req, res) {
    console.log('attemting to post');
    db.user_wants.findOrCreate({
      where: {
        user_id: req.user.id,
        type_id: req.body.typeId,
        type: req.body.type,
        price: req.body.price
      

       
        
      } 
    }).then((user  =>{
      console.log(`Storing your address into the database!!`)
      res.redirect('/profile')
    }))
    
  });


  module.exports = router;