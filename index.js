// require express for this project
const express = require('express');
// fire up the server
const app = express();

// define a port for os
const port = 7000;


//// STATIC
app.use(express.static('./assets'))

/// VIEWS

app.set('view engine', 'ejs');
app.set('views', './views');



app.use('/', require('./routes/index'));



// use listen method to listen the port
app.listen(port,function(err) {
    if(err){ console.log("fire up server is getting error",err); return}
     console.log("server is running successfully on port :",port);
})