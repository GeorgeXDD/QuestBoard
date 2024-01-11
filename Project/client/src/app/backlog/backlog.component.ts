import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskModel } from '../shared/model/tasks/task.model';
import { TaskService } from '../shared/services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  tasks: TaskModel[] = [];

  constructor(private router: Router, private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    // Retrieve tasks for the current logged-in user (you need to implement this logic)
    this.taskService.ApiTaskGetAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: TaskModel): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: { task: task, mode: 'edit', taskId: task.id }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Refresh the task list after editing
      this.refreshTaskList();
    });
  }

  private refreshTaskList(): void {
    // You can call the API to get the updated task list after an edit
    this.taskService.ApiTaskGetAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
