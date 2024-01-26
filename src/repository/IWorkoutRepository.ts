import {IWorkout, Workout} from '../model/Workout';

export interface IWorkoutRepository {
    create(workoutData: IWorkout): Promise<IWorkout>;
    findById(workoutId: string): Promise<IWorkout | null>;
    findAllByUserId(userId: string): Promise<IWorkout[]>;
    update(workoutId: string, workoutData: IWorkout): Promise<IWorkout>;
    delete(workoutId: string): Promise<void>;
}