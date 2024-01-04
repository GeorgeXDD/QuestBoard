import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  createTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const existingTaskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id);

    if (existingTaskIndex !== -1) {
      this.tasks[existingTaskIndex] = { ...updatedTask };
    }
  }
}
