// require express for this project
const express = require('express');
// fire up the server
const app = express();

// define a port for os
const port = 8000;

const db = require('./config/mongoose');
//// STATIC
app.use(express.static('./assets'))

//parser
app.use(express.urlencoded());
/// VIEWS


app.set('view engine', 'ejs');
app.set('views', './views');

// REQUIRE PASSPORT AND LOCALSTARATEGY
const passport = require('passport');
const passportStrategy = require('./config/localstrategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');

const session = require('express-session');
const mongoStore=require('connect-mongo')(session);



app.use(session({
    name:'Social',
    secret:'vgryhufhiejeieieheiu',
    saveUninitialized:false,
    resave:false,
    cookie:{
    maxAge:(1000*60*60)
    },
    store:(new mongoStore({
      mongooseConnection:db,
      autoRemove:'disabled'
    },function(err){console.log(err || "connected to mongostore") }))
 }));




app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// app.use(passport.setAuthenticatedUser);

///

const flash=require('connect-flash');
  app.use(flash());
  app.use(function(req,res,next){ 
    res.locals.flash={
     'success':req.flash('success'),
     'error':req.flash('error')
    }
    next();
   });



app.use('/', require('./routes/index'));



// use listen method to listen the port
app.listen(process.env.PORT || 8080,function(err) {
    if(err){ console.log("fire up server is getting error",err); return}
     console.log("server is running successfully on port :",port);
})