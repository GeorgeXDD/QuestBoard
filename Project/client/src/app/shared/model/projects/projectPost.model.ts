import { TaskModel } from "../tasks/task.model";

export interface ProjectPostModel {
    title: string;
    description: string;
    tasks: TaskModel[];
  }