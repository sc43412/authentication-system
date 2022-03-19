const mongoose=require('mongoose');

const tokenSchema=mongoose.Schema({
       token:{
           type:String
       },
       userid:{
           type:String
       }
});

const tokens=mongoose.model('tokens',tokenSchema);
module.exports=tokens;