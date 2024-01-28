import { IWorkout } from '../model/Workout';
import {WorkoutResponseFormat, WorkoutResponse, WorkoutArrayResponse} from "../api/type/workoutType";

export interface IWorkoutService {
    createWorkout(workoutData: IWorkout): Promise<WorkoutResponse>;
    getWorkoutById(workoutId: string): Promise<WorkoutResponse | null>;
    getAllWorkoutsByUserId(userId: string):  Promise<WorkoutArrayResponse>;
    getAllWorkouts(): Promise<WorkoutArrayResponse>
    updateWorkout(workoutId: string, workoutData: IWorkout): Promise<IWorkout>;
    deleteWorkout(workoutId: string): Promise<void>;
}