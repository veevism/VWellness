import { Container } from "inversify";
import { TYPES } from "../util/type";
import { IWorkoutRepository } from "../repository/IWorkoutRepository";
import { WorkoutRepository } from "../repository/WorkoutRepository";
import { IWorkoutService } from "../service/IWorkoutService";
import { WorkoutService } from "../service/WorkoutService";
import { WorkoutController } from "../api/controller/WorkOutController";

const myContainer = new Container();
myContainer.bind<IWorkoutRepository>(TYPES.WorkoutRepository).to(WorkoutRepository);
myContainer.bind<IWorkoutService>(TYPES.WorkoutService).to(WorkoutService);
myContainer.bind<WorkoutController>(TYPES.WorkoutController).to(WorkoutController);

export { myContainer };