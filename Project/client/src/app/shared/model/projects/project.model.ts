import { TaskModel } from "../tasks/task.model";

export interface ProjectModel {
    id: number;
    title: string;
    description: string;
    tasks: TaskModel[];
  }