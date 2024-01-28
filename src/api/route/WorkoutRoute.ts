import "reflect-metadata";
import { TYPES } from "../type/type";
import { myContainer } from "../../config/investify";
import {WorkoutController} from "../controller/WorkOutController";
const express = require("express")
const router = express.Router()

// Create object from concrete class (# Dependencies Injection)
const workoutController: WorkoutController = myContainer.get<WorkoutController>(TYPES.WorkoutController)


router.route('/').post(workoutController.createWorkout.bind(workoutController))
router.route('/').get(workoutController.getAllWorkout.bind(workoutController))

export default router;
