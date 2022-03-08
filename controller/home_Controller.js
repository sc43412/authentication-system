module.exports.home = function(req,res){
    return res.render('home');
}
module.exports.reset=function(req,res){
    return res.render('resetpassword');
}