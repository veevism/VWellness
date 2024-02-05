import "reflect-metadata";
import { TYPES } from "../type/type";
import { myContainer } from "../../config/investify";
import {WorkoutController} from "../controller/WorkOutController";
import {AuthController} from "../controller/AuthController";
import {AuthService} from "../../service/AuthService";
import {verifyRefreshToken} from "../middleware/verifyRefreshToken";
import {GoalService} from "../../service/GoalService";
import {GoalController} from "../controller/GoalController";
const express = require("express")
const router = express.Router()

// Create object from concrete class (# Dependencies Injection)
const goalService : GoalService = new GoalService()
const goalController: GoalController = new GoalController(goalService)



router.route('/').post(goalController.createGoal)
router.route('/').get(goalController.getGoal)
// router.route('/refresh').get(verifyRefreshToken, goalController.refreshAuth)
export default router;
