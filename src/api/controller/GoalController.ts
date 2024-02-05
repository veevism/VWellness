import {inject, injectable} from "inversify";
import {IWorkoutService} from "../../service/IWorkoutService";
import {TYPES} from "../type/type";
import {NextFunction, Request, Response} from "express";
import {IWorkout} from "../../model/Workout";
import {WorkoutArrayResponse, WorkoutResponse} from "../type/workoutType";
import {createErrorResponse, createSuccessResponse, GeneralError} from "../../util/helper";
import {AuthService} from "../../service/AuthService";
import {GoalService} from "../../service/GoalService";
import {Goal, GoalStatus, IGoal} from "../../model/Goal";
import {authRequest} from "../type/authType";

@injectable()
export class GoalController {
    private goalService : GoalService


    constructor(goalService : GoalService) {
        this.goalService = goalService;
    }

    public createGoal = async (req: authRequest, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { userId  } = req

            const { type, target, startDate, dueDate, note } = req.body;

            const existingGoal = await Goal.findOne({ userId, type,  status : GoalStatus.Incomplete }).exec();

            console.log(existingGoal)

            if (existingGoal) {
                throw new GeneralError(409, `A goal of type '${type}' already exists for this user. Duplicate goals are not allowed.`);
            }

            const goal: IGoal = await this.goalService.createGoal(userId, type, target, new Date(startDate), new Date(dueDate), note);

            return res.status(201).json(createSuccessResponse(goal, 'Goal created successfully'));
        } catch (error) {
            next(error);
        }
    }

    public getGoal = async (req: authRequest, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { userId } = req;
            const goal: IGoal[] = await this.goalService.getGoal(userId);

            if (!goal) {
                return res.status(404).json(createErrorResponse("Goal not found"));
            }

            return res.status(200).json(createSuccessResponse(goal, 'Goal retrieved successfully'));
        } catch (error) {
            next(error);
        }
    }

}