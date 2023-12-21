import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/model/task.model'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  task: Task = {id: 1 , title: '', assignTo: '', description: '' };

  constructor(private dialogRef: MatDialogRef<TaskComponent>, private taskService: TaskService) {}

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.task-popup-container')?.classList.add('active');
    }, 100);
  }

  createTask(): void {
    this.taskService.createTask(this.task);
    this.dialogRef.close();
  }
}
