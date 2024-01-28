import {IWorkout, Workout} from '../model/Workout';
import { IWorkoutRepository } from '../repository/IWorkoutRepository';
import { IWorkoutService } from './IWorkoutService';
import { injectable, inject } from "inversify";
import { TYPES } from "../api/type/type";
import {WorkoutResponseFormat, WorkoutResponse, WorkoutArrayResponse} from "../api/type/workoutType";


@injectable()
export class WorkoutService implements IWorkoutService {
    private workoutRepository: IWorkoutRepository;

    constructor(@inject(TYPES.WorkoutRepository) workoutRepository: IWorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

   public async createWorkout(workoutData: IWorkout):Promise<WorkoutResponse> {
        try {
            const newWorkout : IWorkout  = await Workout.create(workoutData);
            const workoutResponse: WorkoutResponseFormat = {
                type: newWorkout.type,
                duration: newWorkout.duration,
                caloriesBurned: newWorkout.caloriesBurned,
                date: newWorkout.date,
                heartRateAvg: newWorkout.heartRateAvg
            };
            return { workout: workoutResponse };
        } catch (error) {
            throw error;
        }
    }

    async getWorkoutById(workoutId: string): Promise<WorkoutResponse | null> {
        const workout : IWorkout = await this.workoutRepository.findById(workoutId);
        const workoutResponse : WorkoutResponseFormat = {
            type: workout.type,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            date: workout.date,
            heartRateAvg: workout.heartRateAvg
        }

        return { workout: workoutResponse };
    }

    async getAllWorkoutsByUserId(userId: string): Promise<WorkoutArrayResponse> {
        const workouts : IWorkout[] = await this.workoutRepository.findAllByUserId(userId);
        const workoutsResponse : WorkoutResponseFormat[] = workouts.map(workout => ({
            type: workout.type,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            date: workout.date,
            heartRateAvg: workout.heartRateAvg
        }));
        return { workouts: workoutsResponse };

    }

    async getAllWorkouts(): Promise<WorkoutArrayResponse> {
        const workouts : IWorkout[] = await this.workoutRepository.findAll();
        const workoutsResponse : WorkoutResponseFormat[] = workouts.map(workout => ({
            type: workout.type,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            date: workout.date,
            heartRateAvg: workout.heartRateAvg
        }));

        return { workouts: workoutsResponse };

    }

    async updateWorkout(workoutId: string, workoutData: IWorkout): Promise<IWorkout> {
        return this.workoutRepository.update(workoutId, workoutData);
    }

    async deleteWorkout(workoutId: string): Promise<void> {
        await this.workoutRepository.delete(workoutId);
    }
}