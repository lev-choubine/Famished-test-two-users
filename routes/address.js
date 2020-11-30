const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/profile', function(req, res) {
    console.log('attemting to post');
    db.user_profile.findOrCreate({
      where: {
        user_id: req.user.id,
        name: req.user.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
        
      } 
    }).then((user  =>{
      console.log(`Storing your address into the database!!`)
      res.redirect('/profile')
    }))
    
  });


  module.exports = router;