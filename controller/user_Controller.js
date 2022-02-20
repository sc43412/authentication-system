const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('_signup');
}
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('_signin');
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
    console.log("logout is ok")
      req.logout();
    return res.redirect('/users/sign-in');
}