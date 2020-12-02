require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const API_KEY = process.env.API_KEY;



app.get('/', function(req, res) {
    let distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=420+St+Nicholas+Avenue+New+York,NY+10027&destinations=180+Ludlow+Street+New+York,NY+10002&key="+API_KEY;
    // Use request to call the API
    axios.get(distanceURL ).then(response => {
      let apiResults = response.data.results;
      console.log(apiResults)
      res.render('finds', { apiResults});
    });
  });