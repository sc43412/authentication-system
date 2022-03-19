const User = require('../models/user');
const Token = require('../models/token');
module.exports.home = function(req,res){
    return res.render('home');
}
module.exports.reset=function(req,res){
    return res.render('resetpassword');
}

module.exports.delete = async function(req,res){
    // console.log(user._id);
    try{
    let user = await User.findById(req.user._id);
    if(user){
        let idsave = req.user._id;
      await  user.remove();
     let token = await Token.findOne({userid:idsave});
     
     if(token){
        await  Token.deleteMany({userid:idsave});
     }

       req.flash('success','account successfully deleted');
       return res.redirect('/users/sign-in')}
     else{
        req.flash('error','account cannot deleted');
        return res.redirect('/');
    }
    // console.log('hello');
    // console.log(req.user._id);
    // return;
} 
catch(err){
    req.flash('error','not find in db');
    console.log(err);
    return res.redirect('/')
}
}