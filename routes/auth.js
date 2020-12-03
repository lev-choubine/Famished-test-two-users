const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

passport

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});



router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/user_address', (req,res)=>{
  res.render('user_address')
})

router.get('/seller_address', (req,res)=>{
  res.render('seller_address')
})


router.post('/signup', (req, res) => {
  console.log(req.body);
  if(req.body.seller==='on'){
  
    ////////////////////////////////////////
    db.seller.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        name: req.body.name,
        password: req.body.password,
        type: 'seller'
      }
    })
    .then(([seller, created]) => {
      if (created) {
        // if created, success and redirect back to home
      
        // Flash Message
        const successObject = {
          successRedirect: '/auth/seller_address',/////////////////////////problem here!!
          successFlash: 'Account created and logging in...'
        }
        passport.authenticate('local', successObject)(req, res);
      } else {
        // Email already exists
        req.flash('error', 'Email already exists...')
        res.redirect('/auth/signup');
      }
    })
    .catch(err => {
      console.log('Error', err);
      req.flash('error', 'Either email or password is incorrect. Please try again.');
      res.redirect('/auth/signup');
    })

  }else{
  ////////////////////////////////////////////////////////////////
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
  
    }
  })
  .then(([user, created]) => {
    if (created) {
      // if created, success and redirect back to home
     
      // Flash Message
      const successObject = {
        successRedirect: '/auth/user_address',//////////////////////////////SHOULD REDIRECT TO THE ADDRESS DETAILS!
        successFlash: 'Account created and logging in...'
      }
      passport.authenticate('local', successObject)(req, res);
    } else {
      // Email already exists
      req.flash('error', 'Email already exists...')
      res.redirect('/auth/signup');
    }
  })
  .catch(err => {
    console.log('Error', err);
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/auth/signup');
  })}
////////////////////////////////////////////////////////////////////////////////////  
});
////////////////////////////////////////////////////////////////////////////////////
router.post('/login', passport.authenticate('local', {
  
  successRedirect: '/profile',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back...',
  failureFlash: 'Either email or password is incorrect. Please try again.'
}));

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Logging out... See you soon.');
  res.redirect('/');
});

module.exports = router;
