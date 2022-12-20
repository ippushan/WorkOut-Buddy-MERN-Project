
const userHelper = require('../helpers/userHelpers')
const asyncHandler = require('express-async-handler')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}



// @desc login user
// @route Post /api/user/login

const userLogin = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    //vlidation
    if (!email || !password) {
        throw new Error('Please Fill All Fields')
    }
    try{
    const user = await userHelper.checkUser(email)
    if(!user){
        const err = new Error()
        err.message = 'email not valid'
        throw err
    }
    
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        const err = new Error()
        err.message = 'password not valid'
        throw err
    }
    res.status(200).json({ email, token: createToken(user._id) })

    }catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
    
    

})


// @desc create user
// @route Post /api/user/signup
const userSignup = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    //validation
    if (!email || !password) {
        throw new Error('Please Fill All Fields')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough')
    }

    try {
        const userDetails = await userHelper.checkUser(email)
        if (userDetails) {
            const err = new Error()
            err.message = "email already in use"
            throw err
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await userHelper.createUser(email, hash)

        res.status(200).json({ email, token: createToken(user._id) })
  
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { userLogin, userSignup }