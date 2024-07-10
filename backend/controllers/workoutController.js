const Workout = require('../models/workoutModels')
const mongoose = require('mongoose');

//get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user.id
    const adminAccess = (user_id === "668ba4d0931c3dc0b8452c46")
    console.log("Admin Access: ", adminAccess)
    if (adminAccess) {
      const workouts = await Workout.find({}).sort({createdAt: -1})
      res.status(200).json(workouts)
    }
    else {
      const workouts = await Workout.find({user_id}).sort({createdAt: -1})
      res.status(200).json(workouts)
    }
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

// get workout by id
const getWorkoutById = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({error: 'Invalid id'})
  }
  try {
    const workout = await Workout.findById(id)
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({error: err.message})
  } 
}

//create workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body
  const user_id = req.user.id
  const username = req.username.username
  let emptyFields = []
  
  if (!title) {
    emptyFields.push('title')
  } 

  if (!reps) {
    emptyFields.push('reps')
  }

  if (!load) {
    emptyFields.push('load')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in the following fields", emptyFields});
  }

  try {
    const user_id = req.user._id
    const username = req.username.username
    const workout = await Workout.create({title, reps, load, user_id, username})
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

// update workout
const updateWorkout = async (req, res) => {
    //add doc to db
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({error: 'Invalid id'})
    }
  try {
    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body})
    if (!workout) {
      res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

// delete workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({error: 'Invalid id'})
    }
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

//patch workout
const patchWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body)
    if (!workout) {
      res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}       

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout
}