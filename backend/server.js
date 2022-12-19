const express = require('express')
const mongoose = require('mongoose')
require ('dotenv').config()
const cors = require('cors')
const workoutRoutes = require('./routes/workout.js')
const userRoutes = require('./routes/user')
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const errorHandler = require('./middleware/errorHandler')

//express app
const app = express()
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})
//cors policy
app.use(cors())

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user/',userRoutes)

//errorHandler
app.use(errorHandler)

//Connect to database
mongoose.connect(MONGO_URI).then(()=>{
    //listen for request
    app.listen(PORT, () =>{
        console.log(`Database connected and listening port ${PORT}`)
    })
}).catch((err)=>console.log(err))



