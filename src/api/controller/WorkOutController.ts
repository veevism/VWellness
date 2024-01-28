import {NextFunction, Request, Response} from 'express';
import { IWorkoutService } from '../../service/IWorkoutService';
import { IWorkout } from '../../model/Workout';
import { inject, injectable } from "inversify";
import { TYPES } from "../type/type";
import {ErrorResponse, SuccessResponse} from "../../model/ApiResponse";
import {createErrorResponse, createSuccessResponse, GeneralError, InternalError} from "../../util/helper";
import {WorkoutResponseFormat, WorkoutResponse, WorkoutArrayResponse} from "../type/workoutType";


// type WorkoutResponse = Pick<IWorkout, 'type' | 'duration' | 'caloriesBurned' | 'date'>;

@injectable()
export class WorkoutController {
    private workoutService: IWorkoutService;


    constructor(@inject(TYPES.WorkoutService) workoutService: IWorkoutService) {
        this.workoutService = workoutService;
    }

    public createWorkout = async (req: Request, res: Response, next : NextFunction): Promise<Response> => {
        try {
            const workoutData: IWorkout = req.body;
            const newWorkout: WorkoutResponse = await this.workoutService.createWorkout(workoutData);
            if (!newWorkout) {
                throw new GeneralError(409,"Can't create workout")
            }

            return res.status(201).json(createSuccessResponse(newWorkout, 'Workout created successfully'));
        } catch (error) {
            next(error)
        }
    }

    public getAllWorkoutsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const workoutId : string = req.params.userId;
            const workoutArrayResponse : WorkoutArrayResponse = await this.workoutService.getAllWorkoutsByUserId(workoutId);
            if (!workoutArrayResponse.workouts.length ) {
                throw new GeneralError(404,"Workout not found")
            }

            return res.status(200).json(createSuccessResponse(workoutArrayResponse, 'Find all workout successfully'));
        } catch (error) {
            next(error)
        }
    }

    public getAllWorkouts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const workoutArrayResponse : WorkoutArrayResponse = await this.workoutService.getAllWorkouts();
            if (!workoutArrayResponse.workouts.length ) {
                throw new GeneralError(404,"Workout not found")
            }
            return res.status(200).json(createSuccessResponse(workoutArrayResponse, 'Find all workout successfully'));
        } catch (error) {
            next(error)
        }
    }

}