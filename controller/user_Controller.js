const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer=require('../mailers/forgotpassword');
const TOKEN=require('../models/token');
const crypto=require('crypto');
const encrypt = require('../functions/encrypt');


//// SIGN UP FORM
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        return res.render('home');
    }
  return  res.render('_signup');
}

//// SIGN IN FORM

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.render('home');
        
    }
   return res.render('_signin');
}

//////CREATE     THE USER


module.exports.create = async function(req,res){
  if(req.body.password != req.body.repassword){
    req.flash('error','password does not match');
      return res.redirect('back');
  } else {
        req.body.password =  await encrypt.encryption(req.body.password);
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
                req.flash('error','email already exists');
              return res.redirect('back');
          }
      } catch (error) {
          if(err){console.log(err); return res.redirect('back')}
      }

   
  }


}

//////// LOGIN IN CREATE SESSION
module.exports.createsession = function(req,res){
    req.flash('success','sign in succesfully');
    console.log("ok");
    return res.redirect('/');
}

//// DESTROY THE SESSION LOGGED OUT IS OK
module.exports.destroysession = function(req,res){
    req.flash('success','logged-out');
    console.log("logout is ok")
      req.logout();
    //   req.session.destroy();
    return res.redirect('/users/sign-in');
}



// PASSWORD RESET AFTER LOGIN IN 
module.exports.reset= async function(req,res){
    let USER =  await User.findById(req.user._id)
      if( req.body.password==req.body.confirmpassword){
        const validpassword = await bcrypt.compare(req.body.oldpassword,USER.password);
        if(validpassword==false){
          req.flash('error','password not changed');
          return res.redirect('/resetpassword');
        }
           USER.password=  await encrypt.encryption(req.body.password);
           USER.save();
           req.flash('success','password changed');
           return res.redirect('/');
       }
       else{
          req.flash('error','password not changed');
           return res.redirect('/resetpassword');
       }
  
}

module.exports.forgotpage=function(req,res){
  return res.render('_sendlink');
}

/// sending link through email
module.exports.sendlink=async function(req,res){
   
  let USER=await User.findOne({email:req.body.email});
     if(USER){
         let  hex=crypto.randomBytes(20).toString('hex');  
       let Token =await  TOKEN.create({
                      userid:USER._id,
                      token:hex
                  });
                  setTimeout(function(){
                      Token.remove();
                   },120000);
        
         nodemailer.forgotpassword(req.body.email,Token.token);
         req.flash('success','link sent to this email');
         return res.redirect('back');
     }
     else{
         req.flash('error','This email do not exists in the database');
         return res.redirect('back');
     }
  
}


///////////CReate tokens

module.exports.newpassword=function(req,res){
  
  TOKEN.findOne({token:req.query.token},function(err,Token){
   if(!Token){
      return res.end('<h1> TOKEN EXPIRED :( </h1>');
   }else{
          return res.render('_forgotbymail',{
                  token:Token.token
          });
      } 
 });

}

///////RESET PASSWORD BEFORE LOGIN 
module.exports.resetThroughMail= async function(req,res){
   try{
     let Token= await  TOKEN.findOne({token:req.body.token})
    console.log(Token.userid)
     let USER = await  User.findOne({_id:Token.userid});
     console.log(USER.password,USER.name);
            if(req.body.password==req.body.confirmpassword){
                USER.password=await encrypt.encryption(req.body.password);
                USER.save();
                req.flash('success','password changed');
                return res.redirect('/users/sign-in');
            }else{
                req.flash('error','password/confirm-password do not match');
                return res.redirect('back');
            }
      
          }

          catch(err){
               req.flash('error','error in finding database');
               console.log(err);
               return res.redirect('back');
          }
  


}