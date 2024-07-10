require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.use( express.urlencoded({ extended: true }) );
app.use(express.json());


// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then (() => {
      // listen for requests
      app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT)
    })

  })
  .catch ((err) => {
    console.log('error connecting to mongodb', err)
  })
