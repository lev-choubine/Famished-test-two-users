require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const cloudinary = require('cloudinary');
const uploads =multer({ dest: './uploads'})
const ejsLayouts = require('express-ejs-layouts');

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
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            open_at: req.body.open,
            closes_at:req.body.close,
            website: req.body.website 
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
        closes_at:req.body.close,
        website: req.body.website 
        
      } 
    }).then((user  =>{
   
      res.redirect('/profile')
    })).catch((err)=>{
      console.log(err);
    })
    
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
      res.status(400).render('error')
    })
  })
///////////////////////////////////////////////////////////////
router.post('/profile_profilepic', uploads.single('inputFile'),(req, res)=>{
  console.log('On POST route');
  if (req.file){
    let file = req.file.path;
    cloudinary.uploader.upload(file,(result) =>{
      console.log(file)
       console.log(result);
  //render result page with image
  
  db.seller_profile.findOne({
    where: { seller_id : req.user.id}
    }).then((user)  =>{
        user.update ({
            image: result.url
        })
       res.redirect('/profile')
    }).catch((err)=>{
      res.status(400).render('error')
    })
  })
  }else{
    res.redirect('/profile')
  }
  

}) 
////////////////////////////////////////////////////////////
router.post('/profile_foodpic', uploads.single('inputFile2'),(req, res)=>{
  console.log('On POST route');
  if(req.file){
    let file = req.file.path;
    cloudinary.uploader.upload(file,(result) =>{
      console.log(file)
       console.log(result);
  //render result page with image
  db.seller_has.findOne({
    where: { id : req.body.id}
    }).then((user)  =>{
        user.update ({
          type_image: result.url
        })
       res.redirect('/profile')
    }).catch((err)=>{
      res.status(400).render('error')
    })
  })
  }else{
    res.redirect('/profile')
  }
 
})

// router.get('/:url',(req, res) => {
     
// })


   
  module.exports = router;
  