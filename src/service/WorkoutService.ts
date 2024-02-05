import {IWorkout, Workout} from '../model/Workout';
import { IWorkoutRepository } from '../repository/IWorkoutRepository';
import { IWorkoutService } from './IWorkoutService';
import { injectable, inject } from "inversify";
import { TYPES } from "../api/type/type";
import {WorkoutResponseFormat, WorkoutResponse, WorkoutArrayResponse} from "../api/type/workoutType";
import {Goal, GoalStatus, IGoal} from "../model/Goal";
import {User} from "../model/User";


@injectable()
export class WorkoutService implements IWorkoutService {
    private workoutRepository: IWorkoutRepository;

    constructor(@inject(TYPES.WorkoutRepository) workoutRepository: IWorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

   public async createWorkout(workoutData: IWorkout, userId : string):Promise<WorkoutResponse> {
        try {

            const workoutWithUser = {
                ...workoutData,
                userId: userId,
            };

            const newWorkout : IWorkout  = await Workout.create(workoutWithUser);

            const goals  = await Goal.find({ type: workoutData.type, userId: userId, status : GoalStatus.Incomplete });

            const savePromises = goals.map(async (goal) => {
                goal.progressLogs.push({
                    date: new Date(),
                    workoutId: newWorkout._id,
                    note: `Added from workout ${newWorkout._id}`
                });

                goal.currentProgress =  goal.currentProgress + workoutData.caloriesBurned ;

                if (goal.target <= goal.currentProgress) {
                    goal.status = GoalStatus.Complete;
                    const user = await User.findOne({ userId: userId }).exec();
                    if (user) {
                        user.points += 150;
                        await user.save();
                    }
                }

                return goal.save();
            });

            await Promise.all(savePromises);

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