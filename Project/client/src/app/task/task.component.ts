import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  task: Task = { id: 1, title: '', assignTo: '', description: '' };

  constructor(
    private dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, isEditMode: boolean },
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.task-popup-container')?.classList.add('active');
    }, 100);

    if (this.data.isEditMode && this.data.task) {
      this.task = { ...this.data.task };
    }
  }

  saveTask(): void {
    if (this.data.isEditMode) {
      this.taskService.updateTask(this.task);
    } else {
      this.taskService.createTask(this.task);
    }

    this.dialogRef.close();
  }
}
