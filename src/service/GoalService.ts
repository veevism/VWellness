import {injectable} from "inversify";
import {AuthResponse, jwtDecoded, userDataFormat} from "../api/type/authType";
import {GeneralError} from "../util/helper";
import {IUser, User} from "../model/User";
import bcrypt from "bcrypt";
import jwt, {JwtPayload} from "jsonwebtoken";
import {WorkoutType} from "../api/type/workoutType";
import {Goal, GoalStatus, IGoal} from "../model/Goal";

@injectable()
export class GoalService {

    constructor() {
    }


    public async createGoal(userId: string, type: WorkoutType, target: Number, startDate: Date, dueDate: Date, note?: string): Promise<IGoal> {
        try {
            const newGoal: IGoal = new Goal({
                userId,
                type,
                target,
                currentProgress: 0,
                startDate,
                dueDate,
                status: GoalStatus.Incomplete,
                progressLogs: [] ,
                note
            });

            const savedGoal : IGoal = await newGoal.save();

            return savedGoal;
        } catch (error) {
            throw new GeneralError(500, `Error creating goal: ${error.message}`);
        }
    }

    public async getGoal(userId: string): Promise<IGoal[] | null> {
        try {
            const goal = await Goal.find({
                userId: userId
                , status : GoalStatus.Incomplete
            }).exec();

            return goal;
        } catch (error) {
            throw new GeneralError(500, `Error retrieving goal: ${error.message}`);
        }
    }



}