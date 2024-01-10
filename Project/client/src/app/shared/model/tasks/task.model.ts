export interface TaskModel {
    id: number;
    title: string;
    assignedUserId: string;
    description: string;
    state: TaskState;
    projectId: number;
  }

  export enum TaskState {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    InReview = 'InReview',
    Done = 'Done'
  }