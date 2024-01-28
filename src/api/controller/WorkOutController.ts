import { Request, Response } from 'express';
import { IWorkoutService } from '../../service/IWorkoutService';
import { IWorkout } from '../../model/Workout';
import { inject, injectable } from "inversify";
import { TYPES } from "../type/type";
import {ErrorResponse, SuccessResponse} from "../../model/ApiResponse";


type WorkoutResponse = Pick<IWorkout, 'type' | 'duration' | 'caloriesBurned' | 'date'>;

@injectable()
export class WorkoutController {
    private workoutService: IWorkoutService;


    constructor(@inject(TYPES.WorkoutService) workoutService: IWorkoutService) {
        this.workoutService = workoutService;
    }

    public createWorkout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const workoutData: IWorkout = req.body;
            const newWorkout: IWorkout = await this.workoutService.createWorkout(workoutData);
            const workoutResponse: WorkoutResponse = {
                type: newWorkout.type,
                duration: newWorkout.duration,
                caloriesBurned: newWorkout.caloriesBurned,
                date: newWorkout.date
            };

            const response: SuccessResponse<WorkoutResponse> = {
                success: true,
                data: workoutResponse,
                msg: 'Workout created successfully'
            };
            return res.status(201).json(response);
        } catch (error) {
            const errorResponse: ErrorResponse = {
                success: false,
                msg: error.message
            };
            return res.status(400).json(errorResponse);
        }
    }

    public getWorkoutById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const workoutId : string = req.params.id;
            const workout : IWorkout = await this.workoutService.getWorkoutById(workoutId);
            if (!workout) {
                return res.status(404).json({ message: 'Workout not found' });
            }
            return res.json(workout);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}