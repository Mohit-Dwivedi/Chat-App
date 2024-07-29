const getUserDetailFromToken = require("../helpers/getUserDetailFromToken")
const UserModel = require("../models/UserModel")

async function updateUser (req,res){
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailFromToken(token)

        const {name, profile_pic} = req.body

        const updateUser = await UserModel.updateOne({_id: user._id},{name, profile_pic})

        const userInfo = await UserModel.findById(user._id)

        return res.json({
            message: "user updated successfully",
            data: userInfo,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error, 
            error: true
        })
    }
}
module.exports = updateUser