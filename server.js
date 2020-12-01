
require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);
const app = express();
const db = require('./models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionObject));

// Initialize passport and run through middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
// Using flash throughout app to send temp messages to user
app.use(flash());

// Messages that will be accessible to every view
app.use((req, res, next) => {
  // Before every route, we will attach a user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  console.log(res.locals.alerts);
  res.render('index', { alerts: res.locals.alerts });
});

app.get('/profile', isLoggedIn, (req, res) => {
  
  if(req.user.type){
    db.seller_profile.findOne({
      where: {seller_id : req.user.id}
    })
    .then(
      prof => {
        let business = JSON.stringify(prof.business_name)
        let info = JSON.stringify(prof.description)
        let image = JSON.stringify(prof.image)
        let street = JSON.stringify(prof.street)
        let city = JSON.stringify(prof.city)
        let state = JSON.stringify(prof.state)
        let zip = JSON.stringify(prof.zip)
        let open = JSON.stringify(prof.open_at)
        let close = JSON.stringify(prof.closes_at)
        
      
      db.items.findAll().then(finds => {
        let find = finds
        db.seller_has.findAll({
         where: {seller_id : req.user.id}
       }).then(picks=>{
         console.log('!!!!!!!!!!'+JSON.stringify(picks))
         let pick = picks
         res.render('seller_profile', {pass: req.user.name, business, info, image, street, city, state, zip, open, close, find, pick});
       })
       })

      }
    )
    ////////////////////////////////////////////////////////////////////
    .catch(err=>{console.log(err)})
  /////////////////////////////////////////////////////////////////////  
  } else {
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
    console.log('!!!!!!!!!!'+JSON.stringify(picks))
    let pick = picks
    console.log('!!!!!!!!!!'+JSON.stringify(picks))
    res.render('profile', {pass: req.user.name, street, city, state, zip, find, pick});
  })
  }
/////////////////////////////////////////////////////////////////////////
)
///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

    
})
    .catch(err=>{console.log(err)})
    
    
  }
  
});

app.get('/profile/finds', async (req,res) => {
  const picks = await db.user_wants.findAll({
    where: {user_id : req.user.id}
  })
  let found = []
  picks.forEach( async (p) =>{
    const find = await  db.seller_has.findAll({
      where: {type: p.type, price:{[Op.lte]:p.price}}
    })
    found=found.concat(find)    
  })
 console.log('@@@@@@@@@@@@@'+found)

///////////////////////////////////////////  
//   db.user_profile.findOne({
//     where: {user_id : req.user.id}
//   })
//   //////////1st THEN///////////////////////
//   .then(
//     prof => {
//       let street = JSON.stringify(prof.street)
//       let city = JSON.stringify(prof.city)
//       let state = JSON.stringify(prof.state)
//       let zip = JSON.stringify(prof.zip)
//       db.items.findAll().then(finds => {
//  let find = finds
//  db.user_wants.findAll({
//   where: {user_id : req.user.id}
//   /////////////2nd NESTED THEN////////////////
// }).then(picks=>{
//   let found = []
//   let test = 0
//   let pick = picks
//   pick.forEach(p => {
//     db.seller_has.findAll({
//       where: {type:p.type, price:{[Op.lte] : p.price}}
//   })
//   ////////////3rd NESTED THEN//////////////////
//   .then(finds => {
//   console.log(JSON.stringify(found))
//   found.push(finds)
//   test = test +1
//   console.log('A'+test)
//   }
//   /////////////3rd NESTED THEN
//   )
//   console.log('B'+test)

//   });
  
//   console.log('@@@@@@@@'+found);
  
  
// res.render('finds', {pass: req.user.name, street, city, state, zip, find, pick, found})
// /////////////2nd NESTED THEN//////////////
// })
// ////////////////////////////////////
// }
// /////////////////////////////////////////////////////////////////////////
// )
// ///////////////////////////////////////////////////////////////////////

// /////////////////////////////////1ST THEN////////////////
// })
//   .catch(err=>{console.log(err)})
  
  
  
})

app.use('/auth', require('./routes/auth'));
app.use('/address', require('./routes/address'));
app.use('/seller_address', require('./routes/seller_address'));
app.use('/user_food', require('./routes/user_food'));
app.use('/seller_food', require('./routes/seller_food'));
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});



module.exports = server;
