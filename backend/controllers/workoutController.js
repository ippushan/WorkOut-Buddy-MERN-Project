const Workout = require('../model/workoutModel');
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

// @desc get all Workouts
// @route Get /api/workout/
const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }).limit(3)
    res.status(200).json(workouts)
})

// @desc get a workout
// @route Get /api/workouts/:id
const getWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('Not such a Workout')

    }
    const workout = await Workout.findById({ _id: id })

    if (!workout) {
        res.status(404)
        throw new Error('Not such a Workout')
    }

    res.status(200).json(workout)

})
// @desc Create a workout
// @route Post /api/workouts/
const createWorkout = asyncHandler(async (req, res) => {
    const { title, reps, load } = req.body;
    const emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length) {
        res.status(400)
        let err = new Error('Please Fill All Fields')
        err.emptyFields = emptyFields
        throw err
    }


    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400)
        throw new Error(error)

    }
})

// @desc Update a workout
// @route Patch /api/workouts/:id
const updateWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Not such a Workout')

    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        res.status(400)
        throw new Error('Not such a Workout')
    }
    res.status(200).json(workout)
})


// @desc Delete a workout
// @route Delete /api/workouts/:id
const deleteWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Not such a Workout')
    }
    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
        res.status(400)
        throw new Error('Not such a Workout')
    }
    res.status(200).json(workout)
})


module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}