const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://saurav:6quv8DLHe9kNsvIY@cluster0.rzv05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
//mongodb+srv://saurav:6quv8DLHe9kNsvIY@cluster0.rzv05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://saurav:<password>@cluster0.rzv05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const db = mongoose.connection;
//6quv8DLHe9kNsvIY

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;