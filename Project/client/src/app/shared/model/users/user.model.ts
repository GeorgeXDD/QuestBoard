import { TaskModel } from "../tasks/task.model";

export interface UserModel {
    id: number;
    userName: string;
    email: string;
    password: string;
    tasks?: TaskModel[];
  }