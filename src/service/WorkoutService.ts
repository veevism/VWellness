import { IWorkout } from '../model/Workout';
import { IWorkoutRepository } from '../repository/IWorkoutRepository';
import { IWorkoutService } from './IWorkoutService';

export class WorkoutService implements IWorkoutService {
    private workoutRepository: IWorkoutRepository;

    constructor(workoutRepository: IWorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    async createWorkout(workoutData: IWorkout): Promise<IWorkout> {
        return this.workoutRepository.create(workoutData);
    }

    async getWorkoutById(workoutId: string): Promise<IWorkout | null> {
        return this.workoutRepository.findById(workoutId);
    }

    async getAllWorkoutsByUserId(userId: string): Promise<IWorkout[]> {
        return this.workoutRepository.findAllByUserId(userId);
    }

    async updateWorkout(workoutId: string, workoutData: IWorkout): Promise<IWorkout> {
        return this.workoutRepository.update(workoutId, workoutData);
    }

    async deleteWorkout(workoutId: string): Promise<void> {
        await this.workoutRepository.delete(workoutId);
    }
}