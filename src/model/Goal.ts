import mongoose, { Document } from 'mongoose';
import { WorkoutType } from "../util/workoutType";

type Note = String
type Target = Number
type currentProgress = Number

enum GoalStatus {
    Complete = "Complete",
    Incomplete = "Incomplete",
}

interface IProgressLog {
    date: Date;
    workoutId?: mongoose.Types.ObjectId;
    note: Note;
}

interface IGoal extends Document {
    userId: mongoose.Types.ObjectId;
    type: WorkoutType;
    target: Target;
    currentProgress: currentProgress;
    startDate: Date;
    dueDate: Date;
    status: GoalStatus;
    progressLogs: IProgressLog[];
}

const ProgressLogSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
    note: { type: String, required: true }
});

const GoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: Object.values(WorkoutType), required: true },
    target: { type: Number, required: true },
    currentProgress: { type: Number, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(GoalStatus) , default: GoalStatus.Incomplete },
    progressLogs: [ProgressLogSchema]
});

export const Goal = mongoose.model<IGoal>('Goal', GoalSchema);
