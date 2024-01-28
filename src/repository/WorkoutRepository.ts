import { Workout, IWorkout } from '../model/Workout';
import { IWorkoutRepository } from './IWorkoutRepository';
import {injectable} from "inversify";

@injectable()
export class WorkoutRepository implements IWorkoutRepository {
    async create(workoutData: IWorkout): Promise<IWorkout> {
        const newWorkout = new Workout(workoutData);
        await newWorkout.save();
        return newWorkout;
    }

    async findById(workoutId: string): Promise<IWorkout | null> {
        return Workout.findById(workoutId);
    }
    async findAllByUserId(userId: string): Promise<IWorkout[]> {
        return Workout.find({ userId: userId });
    }

    async findAll(): Promise<IWorkout[]> {
        return Workout.find({ });
    }

    async update(workoutId: string, workoutData: IWorkout): Promise<IWorkout> {
        return Workout.findByIdAndUpdate(workoutId, workoutData, { new: true });
        // by default findAndUpdate will return data before update.
        // options : new = return data after update
    }

    async delete(workoutId: string): Promise<void> {
        await Workout.findByIdAndDelete(workoutId);
    }
}