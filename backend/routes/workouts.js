const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

//const Workout = require('../models/workoutModels')
const{ createWorkout, 
    getAllWorkouts, 
    getWorkoutById, 
    updateWorkout,
    patchWorkout,
    deleteWorkout } = require('../controllers/workoutController')

router.use(requireAuth)

// get all workouts
router.get('/', getAllWorkouts)

// get workout by id
router.get('/:id', getWorkoutById)

//post workout
router.post('/', createWorkout)

//patv workout
router.patch('/:id', updateWorkout)
 
//delete workout
router.delete('/:id', deleteWorkout)

module.exports = router