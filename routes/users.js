const express = require('express');
const router = express.Router();
const userController = require('../controller/user_Controller')

router.get('/sign-up', userController.signup);
router.get('/sign-in',userController.signin);
module.exports= router;