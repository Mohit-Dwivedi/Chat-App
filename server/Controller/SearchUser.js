const UserModel = require("../models/UserModel")

async function searchUser(req,res){
    try {
        const {search} = req.body

        const querry = new RegExp(search,"i",'g')

        const user = await UserModel.find({
            "$or" : [
                {name: querry},
                {email: querry}
            ]
        }).select('-password')

        return res.json({
            message: "all user",
            data: user,
            success: true
        })
    } catch (error) {
        return res.jsokn({
            message: error.messgae || error,
            error: true
        })
    }
}

module.exports = searchUser