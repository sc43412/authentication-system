// require express for this project
const express = require('express');
// fire up the server
const app = express();

// define a port for os
const port = 7000;

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

const session = require('express-session');



app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore({
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'

    //     },
    
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    
}));




app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes/index'));



// use listen method to listen the port
app.listen(port,function(err) {
    if(err){ console.log("fire up server is getting error",err); return}
     console.log("server is running successfully on port :",port);
})