
require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;
const API_KEY = process.env.API_KEY;
const methodOverride = require('method-override');
const multer = require('multer');
const cloudinary = require('cloudinary');
const uploads =multer({ dest: './uploads'})
const axios = require('axios'); 
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

function plusWord(string){
  let arr = string.split(' ')
  let newString = arr.join("+")
  return newString;

}

app.use(session(sessionObject));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
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
        let image = prof.image
        let street = JSON.stringify(prof.street)
        let city = JSON.stringify(prof.city)
        let state = JSON.stringify(prof.state)
        let zip = JSON.stringify(prof.zip)
        let open = JSON.stringify(prof.open_at)
        let close = JSON.stringify(prof.closes_at)
        let website = JSON.stringify(prof.website)
        console.log('heroku!');
      
      db.items.findAll().then(finds => {
        let find = finds
        db.seller_has.findAll({
         where: {seller_id : req.user.id}
       }).then(picks=>{
        
         let pick = picks
         res.render('seller_profile', {pass: req.user.name, business, info, image, street, city, state, zip, open, close, find, pick, website});
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
   
    let pick = picks
    
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
///////////////////////////////FOR METHOD TO DISPLAY FINDS FOR THE USER///////////////////
app.get('/profile/finds', async (req,res) => {
  let distance;
  let range = 3;
    ////////////////////////////////////////////////////////////////////////////////////////
    //////////////////         Matching Options By Price              ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const picks = await db.user_wants.findAll({
    where: {user_id : req.user.id}
  })
  let found = []
 for (let i=0; i <picks.length; i++){
    const find = await  db.seller_has.findAll({
      where: {type: picks[i].type, price:{[Op.lte]:picks[i].price}}
    })
    if(find[0] !== undefined ){
      // console.log('&&&&&&&&&&&&&&&&&&&&& empty $$$$$$$$$$$$$$$$$$$$$')
      let userProfile = await db.user_profile.findOne({
        where: {user_id : req.user.id}
      })
      let street = plusWord(userProfile.dataValues.street);
      let city = plusWord(userProfile.dataValues.city);
      let state = plusWord(userProfile.dataValues.state);
      let zip =userProfile.dataValues.zip
      /////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////  
      for(let a =0; a <find.length; a++){
      /////////////////////////////////////////////////
      let id = find[a].seller_id
     
      let sellerProfile = await db.seller_profile.findOne({
        where: {seller_id : id} 
      })
      ///////////////get seller details to run the API////////////////
      let streetSeller = plusWord(sellerProfile.dataValues.street);
      let citySeller = plusWord(sellerProfile.dataValues.city);
      let stateSeller = plusWord(sellerProfile.dataValues.state);
      let zipSeller =sellerProfile.dataValues.zip
      let distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+street+"+"+city+","+state+"+"+zip+"&destinations="+streetSeller+"+"+citySeller+","+stateSeller+"+"+zipSeller+"&key="+API_KEY;
      ////////////////////////////////////////////////////////
   await axios.get(distanceURL )
   .then(async response => {
     let apiResults = await response.data.rows[0].elements[0].distance.text
     let reso = await apiResults.slice(0,apiResults.length-3);
     distance = await parseFloat(reso)
     return distance;
   }).catch(err=>{console.log(err)});
      if(distance < range) {
        found=found.concat(find[a]) 
      }
    }
  }else{
  } 
  }
    res.render('finds', {found,})  
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
