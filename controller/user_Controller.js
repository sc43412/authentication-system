const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        return res.render('home');
    }
  return  res.render('_signup');
}
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.render('home');
        
    }
   return res.render('_signin');
}
module.exports.create = async function(req,res){
  if(req.body.password != req.body.repassword){
      console.log('password not match');
      return res.redirect('back');
  } else{
      try {
          let user = await User.findOne({email : req.body.email});
          if(!user){
            User.create(req.body,function(err){
                if(err){console.log('pushing value error'); return res.redirect('back')}
                else{
                   console.log("successfully created"); 
                   req.flash('success','Your account is created');
                   return res.redirect('/users/sign-in')}
            })

          } else{
              return res.redirect('back');
          }
      } catch (error) {
          if(err){console.log(err); return res.redirect('back')}
      }

    //   User.findOne({email:req.body.email},function(err,user){
    // if(err){ console.log("error in find");return ;}
    //  if(!user){
    //      User.create(req.body,function(err){
    //          if(err){console.log('pushing value error'); return res.redirect('back')}
    //          else{
    //             console.log("successfully created"); 
    //             return res.redirect('/users/sign-in')}
    //      })
    //  }
    //  else{
    //      return res.redirect('back')
    //  }


    //   })
  }

}

module.exports.createsession = function(req,res){
    console.log("ok");
    return res.redirect('/');
}
module.exports.destroysession = function(req,res){
    req.flash('success','logged-out');
    console.log("logout is ok")
      req.logout();
    //   req.session.destroy();
    return res.redirect('/users/sign-in');
}

module.exports.reset=function(req,res){

  User.findById(req.user._id,function(err,USER){
    if(err){
        console.log('error in resetting password');
        return;
    } 
    if(
      bcrypt.compare(req.body.oldpassword,USER.password)&& req.body.password==req.body.confirmpassword){
         USER.password=req.body.password;
         USER.save();
         req.flash('success','password changed');
         return res.redirect('/resetpassword');
     }
     else{
        req.flash('error','password not changed');
         return res.redirect('/resetpassword');
     }
});



}