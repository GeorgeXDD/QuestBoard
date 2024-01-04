import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from '../shared/model/task.model';
import { TaskComponent } from '../task/task.component';

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];

  constructor(private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.projects = [
      { 
        id: 1, 
        name: 'Project 1', 
        description: 'Description for Project 1',
        tasks: [
          { id: 1, title: 'Task 1', assignTo: 'User 1', description: 'Description for Task 1' },
          { id: 2, title: 'Task 2', assignTo: 'User 2', description: 'Description for Task 2' },
        ]
      },
      { 
        id: 2, 
        name: 'Project 2', 
        description: 'Description for Project 2',
        tasks: [
          { id: 3, title: 'Task 3', assignTo: 'User 1', description: 'Description for Task 3' },
          { id: 4, title: 'Task 4', assignTo: 'User 3', description: 'Description for Task 4' },
        ]
      },
      { 
        id: 3, 
        name: 'Project 3', 
        description: 'Description for Project 3',
        tasks: [
          { id: 5, title: 'Task 5', assignTo: 'User 1', description: 'Description for Task 5' },
          { id: 6, title: 'Task 6', assignTo: 'User 3', description: 'Description for Task 6' },
        ]
      },
      { 
        id: 4, 
        name: 'Project 4', 
        description: 'Description for Project 4',
        tasks: [
          { id: 7, title: 'Task 7', assignTo: 'User 1', description: 'Description for Task 7' },
          { id: 8, title: 'Task 8', assignTo: 'User 3', description: 'Description for Task 8' },
        ]
      },
      { 
        id: 5, 
        name: 'Project 5', 
        description: 'Description for Project 5',
        tasks: [
          { id: 9, title: 'Task 9', assignTo: 'User 1', description: 'Description for Task 9' },
          { id: 10, title: 'Task 10', assignTo: 'User 3', description: 'Description for Task 10' },
        ]
      },
    ];
  }

  navigateToProjectDetail(projectId: number): void {
    this.router.navigate(['/project', projectId]);
  }

  navigateToProjects(): void {
    this.router.navigate(['/projects']);
  }

  openTaskPopup(task: Task): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
