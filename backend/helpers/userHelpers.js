const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')


const checkUser = async (email) => {

    return new Promise(async (resolve, reject) => {

        try {
            const exist = await User.findOne({ email })
            resolve(exist)
        } catch (error) {
            reject(error)
        }

    })





}

const createUser = (email, hash) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.create({ email, password: hash })
            resolve(user)
        }catch(error){
            console.log(error)
            reject(error)
        }
    })
}

module.exports = {
    checkUser,
    createUser
}