import {WorkoutController} from "../controller/WorkOutController";
import {WorkoutService} from "../../service/WorkoutService";
import {WorkoutRepository} from "../../repository/WorkoutRepository";
import {IWorkoutRepository} from "../../repository/IWorkoutRepository";

const express = require("express")
const router = express.Router()

// Create object from concrete class (# Dependencies Injection)
const workoutRepository: IWorkoutRepository = new WorkoutRepository();
const workoutService : WorkoutService = new WorkoutService(workoutRepository);
const workoutController: WorkoutController = new WorkoutController(workoutService);

router.route('/').get(workoutController.createWorkout)

export default router;
