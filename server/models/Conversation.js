const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    text : {
        type: String,
        defsault: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    seen:{
        type: Boolean,
        default: false
    },
    msgByUserId: {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    }
}, {
    timeStamps : true
})

const ConversationSchema = new mongoose.Schema({ 
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Message'
        }
    ]
}, {
    timeStamps : true
})

const MessageModel = mongoose.model("Message", MessageSchema)
const ConversationModel = mongoose.model("Conversation", ConversationSchema)

module.exports = { 
    MessageModel,
    ConversationModel
}