const express = require('express')
const Workout = require('../model/workoutModel')
const { 
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout 
} = require('../controllers/workoutController')
const router = express.Router()

//Get All Workouts
// router.get('/', getWorkouts)

//Post all Workout
// router.post('/', createWorkout)

//Get single Workout
// router.get('/:id', getWorkout)

//Delete Workout
// router.delete('/:id', deleteWorkout)

//Update Workout
// router.patch('/:id', updateWorkout)
router.route('/').get(getWorkouts).post(createWorkout)

router.route('/:id').get(getWorkout).delete(deleteWorkout).patch(updateWorkout);



module.exports = router;