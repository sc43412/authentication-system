const express = require('express');
const passport = require('passport');
const router = express.Router();
// const encryptionofuser = require('../config/encryptionmiddleware');
const userController = require('../controller/user_Controller')

router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);
router.post('/create',userController.create);
router.post('/createsession',passport.authenticate(
    'local', { failureRedirect: '/users/sign-up' }
),userController.createsession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createsession);
// router.get('/auth/google',userController.signup);
router.post('/passwordreset',userController.reset);

router.get('/forgotpage',userController.forgotpage);

router.post('/sendlink',userController.sendlink);
router.get('/newpassword',userController.newpassword);
router.post('/mail',userController.resetThroughMail);

module.exports= router;