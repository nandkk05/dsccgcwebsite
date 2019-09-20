const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const http = require('http');
const fs = require('fs');
const keys = require('./config/keys');

const moment = require('moment');
const compression = require('compression');
//Axios: Promise based HTTP client for the browser and node.js
const axios = require('axios');
const methodOverride = require('method-override');
//setting up controllers to equivalent routes

const home = require('./routes/index');

const now = new Date();
//setting session middleware
app.use(session({
  secret: 'myproperty',
  resave: false,
  saveUninitialized: false,
}));

//express-validator middleware
app.use(expressValidator());

//setting public folder
app.use(express.static(__dirname + '/public'));

// //setting public folder
// app.use(express.static(__dirname + '/uploads'));

//setting view engine
app.set('view engine', 'ejs');

//setting views folder for ejs
app.set('views', path.join(__dirname, 'views'));

//setting middleware for cookieParser
app.use(cookieParser('keyboard cat'));
app.use(compression());
app.use(compression({
  filter: function () { return true; }
}));
//setting middleware for session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.moment = moment;
  res.locals.axios = axios;
  next();
});

app.use(methodOverride('_method'));


//setting expressMongoDb
mongoose.connect(keys.mongoUrl); //coonectiong to the database url which is present at the config folder

const db = mongoose.connection;

mongoose.Promise = global.Promise; //implemented by me for promise handling

db.once('open', function () {
  console.log('connected db');
});

db.on('error', function (err) {
  if (err) console.log(err);
});

//setting up bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json());


//setting routes to proper controller file
app.use('/', home);

//starting server
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});