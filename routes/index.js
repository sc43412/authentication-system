const express = require('express');
const passport= require('passport');
const router = express.Router();
const homeController = require('../controller/home_Controller')
const userController= require('../controller/user_Controller');
router.use('/users',require('./users'));

router.get('/',passport.checkAuthentication,homeController.home);
router.get('/signout',userController.destroysession);
router.get('/resetpassword',homeController.reset);

router.get('/delete',passport.checkAuthentication,homeController.delete);

module.exports=router;
