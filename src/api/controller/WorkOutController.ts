import { Request, Response } from 'express';
import { IWorkoutService } from '../../service/IWorkoutService';
import { IWorkout } from '../../model/Workout';
import { inject, injectable } from "inversify";
import { TYPES } from "../../util/type";

@injectable()
export class WorkoutController {
    private workoutService: IWorkoutService;

    constructor(@inject(TYPES.WorkoutService) workoutService: IWorkoutService) {
        this.workoutService = workoutService;
    }

    public createWorkout = async (req: Request, res: Response): Promise<Response> => {
        return res.status(201).json("Hello Guys");

        // try {
        //     const workoutData: IWorkout = req.body;
        //     const newWorkout : IWorkout = await this.workoutService.createWorkout(workoutData);
        //     return res.status(201).json(newWorkout);
        // } catch (error) {
        //     return res.status(400).json({ message: error.message });
        // }
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