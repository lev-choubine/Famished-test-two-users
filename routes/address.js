const express = require('express');
const router = express.Router();
const db = require('../models');

router.put('/profile', function(req, res) {
    console.log('attemting to post');
    db.user_profile.findOne({
      where: { user_id :req.user.id} 
    }).then((user  =>{
      user.update({
        user_id: req.user.id,
        name: req.user.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      })
      res.redirect('/profile')
    }))
    
  });


  router.post('/user_address', function(req, res) {
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

  router.delete('/profile', function(req, res) {
    
    db.user_wants.destroy({
      where: {
        type: req.body.type,
        user_id : req.user.id
      } 
    }).then((it  =>{
      console.log(`Removing ${it.name} from our database.`)
      res.redirect('/profile')
    })).catch((err)=>{
      console.log(err);
    })
  })
  

  module.exports = router;