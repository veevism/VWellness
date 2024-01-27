import mongoose, { Document } from 'mongoose';
import { WorkoutType } from '../util/workoutType';


export interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    type: WorkoutType;
    duration: number;
    caloriesBurned: number;
    date: Date;
}

const WorkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: Object.values(WorkoutType), required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true }
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);