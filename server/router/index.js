const express = require('express')
const registerUser = require('../Controller/RegisterUser')
const checkEmail = require('../Controller/checkEmail')
const checkPassword = require('../Controller/checkPassword')
const userDetail = require('../Controller/userDetail')
const logout = require('../Controller/Logout')
const updateUser = require('../Controller/updateUser')
const searchUser= require('../Controller/SearchUser')

const userRouter = express.Router()

//create user api
userRouter.post('/register', registerUser)
//check user email
userRouter.post('/email',checkEmail)
//check user password
userRouter.post('/password', checkPassword)
//login user detail
userRouter.get('/user-details', userDetail)
//logout user
userRouter.get('/logout', logout)
//update user
userRouter.put('/update-user', updateUser)
//search user
userRouter.post('/search-user', searchUser)

module.exports = userRouter