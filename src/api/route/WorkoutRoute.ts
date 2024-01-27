import "reflect-metadata";
import { TYPES } from "../../util/type";
import { myContainer } from "../../config/investify";
import {WorkoutController} from "../controller/WorkOutController";
const express = require("express")
const router = express.Router()

// Create object from concrete class (# Dependencies Injection)
const workoutController: WorkoutController = myContainer.get<WorkoutController>(TYPES.WorkoutController)

router.route('/').get(workoutController.createWorkout.bind(workoutController))

export default router;
