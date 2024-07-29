const mongoose = require('mongoose')

 const connectDB = async () => {
    await mongoose.connect("mongodb+srv://md8932537:mohitlove@chatapp.pphgsb3.mongodb.net/?retryWrites=true&w=majority&appName=Chatapp")
    .then(() => console.log("DB Connected"))
}
 module.exports = connectDB
