export interface TaskModel {
    id: number;
    title: string;
    assignedUserId: string;
    user: string;
    project: string;
    description: string;
    state: TaskState;
    projectId: string;
  }

  export enum TaskState {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    InReview = 'InReview',
    Done = 'Done'
  }