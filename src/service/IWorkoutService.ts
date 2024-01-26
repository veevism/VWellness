import { IWorkout } from '../model/Workout';

export interface IWorkoutService {
    createWorkout(workoutData: IWorkout): Promise<IWorkout>;
    getWorkoutById(workoutId: string): Promise<IWorkout | null>;
    getAllWorkoutsByUserId(userId: string): Promise<IWorkout[]>;
    updateWorkout(workoutId: string, workoutData: IWorkout): Promise<IWorkout>;
    deleteWorkout(workoutId: string): Promise<void>;
}