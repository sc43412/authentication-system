const nodeMailer=require('../config/nodemailer');

module.exports.forgotPassword=function(email,Token){
   
    nodeMailer.transporter.sendMail({
        from: 'snipersourav060@gmail.com',          // sender address
        to:email ,  // list of receivers
        subject: "Forgot Password",     //  Subject line
        html: `http://localhost:8000/users/newpassword/?token=${Token}` 
      },function(err,info){
      if(err){console.log("err in sending mail: ",err); return;}
      console.log("message sent",info);
      return;
      });

}