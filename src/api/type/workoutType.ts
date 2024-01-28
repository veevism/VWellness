import {IWorkout} from "../../model/Workout";

export enum WorkoutType {
    Running = "Running",
    Swimming = "Swimming",
    Yogaing = "Yogaing",
    Walking = "Walking",
}

export type WorkoutResponseFormat = Pick<IWorkout, 'type' | 'duration' | 'caloriesBurned' | 'date'>;

export interface WorkoutResponse {
    workout: WorkoutResponseFormat;
}

export interface WorkoutArrayResponse {
    workouts: WorkoutResponseFormat[];
}