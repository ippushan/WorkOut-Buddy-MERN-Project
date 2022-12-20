const express = require("express");

const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();



router
  .route("/")
  .get(requireAuth, getWorkouts)
  .post(requireAuth, createWorkout);

router
  .route("/:id")
  .get(requireAuth, getWorkout)
  .delete(requireAuth, deleteWorkout)
  .patch(requireAuth,updateWorkout);

module.exports = router;
