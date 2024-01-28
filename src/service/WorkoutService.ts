import {IWorkout, Workout} from '../model/Workout';
import { IWorkoutRepository } from '../repository/IWorkoutRepository';
import { IWorkoutService } from './IWorkoutService';
import { injectable, inject } from "inversify";
import { TYPES } from "../api/type/type";
import {WorkoutResponseFormat, WorkoutResponse} from "../api/type/workoutType";


@injectable()
export class WorkoutService implements IWorkoutService {
    private workoutRepository: IWorkoutRepository;

    constructor(@inject(TYPES.WorkoutRepository) workoutRepository: IWorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

   public async createWorkout(workoutData: IWorkout):Promise<{ workout: WorkoutResponseFormat }> {
        try {
            const newWorkout : IWorkout  = await Workout.create(workoutData);
            const workoutFormat: WorkoutResponseFormat = {
                type: newWorkout.type,
                duration: newWorkout.duration,
                caloriesBurned: newWorkout.caloriesBurned,
                date: newWorkout.date
            };
            return { workout: workoutFormat };
        } catch (error) {
            throw error;
        }
    }

    async getWorkoutById(workoutId: string): Promise<IWorkout | null> {
        return this.workoutRepository.findById(workoutId);
    }

    async getAllWorkoutsByUserId(userId: string): Promise<{ workouts: WorkoutResponseFormat[] }> {
        const workouts : IWorkout[] = await this.workoutRepository.findAllByUserId(userId);
        return { workouts: workouts };

    }

    async getAllWorkouts(): Promise<{ workouts: WorkoutResponseFormat[] }> {
        const workouts : IWorkout[] = await this.workoutRepository.findAll();
        return { workouts: workouts };

    }

    async updateWorkout(workoutId: string, workoutData: IWorkout): Promise<IWorkout> {
        return this.workoutRepository.update(workoutId, workoutData);
    }

    async deleteWorkout(workoutId: string): Promise<void> {
        await this.workoutRepository.delete(workoutId);
    }
}