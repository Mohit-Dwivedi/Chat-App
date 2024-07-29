const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')

const registerUser = async (req,res) => {
    try {
        const {name, email, password, profile_pic } = req.body
        const checkEmail = await UserModel.findOne({email}) // {name, email} // null
        if(checkEmail){
            return res.status(400).json({message: "Already User Exists", error: true})
        }
        // password into hashpassword
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password, salt)
        const payload = {
             name,
             email, 
             password: hashpassword, 
             profile_pic
        }
        const user = new UserModel(payload)
        const usersave = await user.save()
        return res.status(201).json({message:"User Created Successfully", data: usersave, success: true})

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}


module.exports = registerUser