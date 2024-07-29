const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "provide name"]
    },
    email: {
        type: String,
        require: [true, "provide email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "provide password"]
    },
    profile_pic: {
        type: String,
        default: ""
    }
}, {
    timeStamps: true 
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel