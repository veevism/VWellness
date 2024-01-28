import { IWorkout } from '../model/Workout';
import {WorkoutResponseFormat, WorkoutResponse} from "../api/type/workoutType";

export interface IWorkoutService {
    createWorkout(workoutData: IWorkout): Promise<{ workout: WorkoutResponseFormat }>;
    getWorkoutById(workoutId: string): Promise<IWorkout | null>;
    getAllWorkoutsByUserId(userId: string):  Promise<{ workouts: WorkoutResponseFormat[] }>;
    updateWorkout(workoutId: string, workoutData: IWorkout): Promise<IWorkout>;
    deleteWorkout(workoutId: string): Promise<void>;
}