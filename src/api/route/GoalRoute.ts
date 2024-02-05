import "reflect-metadata";
import { TYPES } from "../type/type";
import { myContainer } from "../../config/investify";
import {WorkoutController} from "../controller/WorkOutController";
import {AuthController} from "../controller/AuthController";
import {AuthService} from "../../service/AuthService";
import {verifyRefreshToken} from "../middleware/verifyRefreshToken";
const express = require("express")
const router = express.Router()

// Create object from concrete class (# Dependencies Injection)
const authService : AuthService = new AuthService()
const authController: AuthController = new AuthController(authService)



router.route('/login').post(authController.loginAuth)
router.route('/register').post(authController.registerAuth)
router.route('/refresh').get(verifyRefreshToken, authController.refreshAuth)
export default router;
