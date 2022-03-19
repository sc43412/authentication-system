const User = require('../models/user');

module.exports.home = function(req,res){
    return res.render('home');
}
module.exports.reset=function(req,res){
    return res.render('resetpassword');
}

module.exports.delete = async function(req,res){
    // console.log(user._id);
    let user = await User.findById(req.user._id);
    if(user){
        const value = await  user.remove();
        if(value == true){
       req.flash('success','account successfully deleted');
       return res.render('_signin')}
       else{
        req.flash('error','account cannot deleted');
        return res.redirect('/');
       }
    } else{
        req.flash('error','account cannot deleted');
        return res.redirect('/');
    }
    // console.log('hello');
    // console.log(req.user._id);
    // return;
}