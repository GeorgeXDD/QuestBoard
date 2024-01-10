import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectModel } from '../shared/model/projects/project.model';
import { TaskModel } from '../shared/model/tasks/task.model';
import { ProjectService } from '../shared/services/project.service';
import { TaskService } from '../shared/services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: ProjectModel[] = [];
  tasks: TaskModel[] = [];

  constructor(private router: Router,
    private dialog: MatDialog,
    private taskService: TaskService,
    private projectService: ProjectService
    ) {}

  ngOnInit(): void {
    this.taskService.ApiTaskGetAll().subscribe(tasks => {
      this.tasks= tasks;
      }
    )
    this.projectService.ApiProjectGetAll().subscribe(projects => {
      this.projects = projects;
    })
    console.log(this.projects);
  }


  navigateToProjectDetail(projectId: number): void {
    this.router.navigate(['/project', projectId]);
  }

  navigateToProjects(): void {
    this.router.navigate(['/projects']);
  }

  editTask(task: TaskModel): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: { 
        task: task, 
        mode: 'edit',
        taskId: task.id 
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
