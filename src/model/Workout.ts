import mongoose, { Document } from 'mongoose';
import { WorkoutType } from "../api/type/workoutType";


type Duration = number
type CaloriesBurned = number
type Distance = number
type HeartRateAvg = number
type Note = String

export interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    type: WorkoutType;
    duration: Duration;
    caloriesBurned: CaloriesBurned;
    date: Date;
    distance: Distance;
    heartRateAvg: HeartRateAvg;
    note: Note
}

const WorkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    type: { type: String, enum: Object.values(WorkoutType), required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    distance: { type : Number, required: false },
    heartRateAvg: { type : Number, required: true },
    note: { type : String, required: false }
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);