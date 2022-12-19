const express = require('express');

//controller function

const { userLogin, userSignup } = require('../controllers/userController');

const router = express.Router()



//loginRouter

router.post('/login',userLogin)

//signupRouter

router.post('/signup',userSignup )

module.exports = router;