const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnection = require('./config/ConnectDb')
const userRouter = require('./router/index')
const cookiesParser = require('cookie-parser')
const {app, server} = require('./socket/index')

// const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookiesParser())

dbConnection()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}))

//api end point
app.use('/api/user', userRouter)
 
app.get('/', (req,res) => {
    res.json({
        message: "server running at 4000"
    })
})


server.listen(PORT, () => {
    console.log('server running at ' + PORT)
})
