import { Injectable } from '@angular/core';
import { Task } from '../model/task.model'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  createTask(task: Task): void {
    // this.tasks.push(task);
  }
}