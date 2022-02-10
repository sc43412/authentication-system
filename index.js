// require express for this project
const express = require('express');
// fire up the server
const app = express();

// define a port for os
const port = 4000;


// use listen method to listen the port
app.listen(port,function(err) {
    if(err){ console.log("fire up server is getting error",err); return}
     console.log("server is running successfully on port :",port);
})