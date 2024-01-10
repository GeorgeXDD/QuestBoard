import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/task/task.component';
import { TaskModel } from 'src/app/shared/model/tasks/task.model';

interface TaskColumn {
  name: string;
  tasks: TaskModel[];
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: number;
  taskColumns: TaskColumn[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = Number(params.get('id'));
      this.mockTaskColumns();
    });
  }

  openCreateTaskDialog(task?: TaskModel): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: { 
        task, 
        mode:"new", 
        projectId: this.projectId 
      }
    });
  
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  onTaskMoved(event: any): void {
    const task: TaskModel = event.item.data;
    const currentIndex: number = event.currentIndex;
  
    const sourceColumn: TaskColumn = this.taskColumns.find((column) => column.tasks.includes(task)) || { name: '', tasks: [] };
    const targetColumn: TaskColumn = this.taskColumns.find((column) => column.name === event.container.id) || { name: '', tasks: [] };
  
    this.removeFromColumn(task, sourceColumn);
    this.addToColumn(task, targetColumn, currentIndex);
  }

  connectedLists(currentList: string): string[] {
    const otherLists = this.taskColumns.filter(column => column.name !== currentList).map(column => column.name);
    return otherLists;
  }
  
  
  private removeFromColumn(task: TaskModel, sourceColumn: TaskColumn): void {
    const taskIndex = sourceColumn.tasks.indexOf(task);
    if (taskIndex !== -1) {
      sourceColumn.tasks.splice(taskIndex, 1);
    }
  }
  
  private addToColumn(task: TaskModel, targetColumn: TaskColumn, index: number): void {
    targetColumn.tasks.splice(index, 0, task);
  }

  private mockTaskColumns(): void {
    this.taskColumns = [
      { name: 'To Do', tasks: [
          { id: 1, title: 'Task 1', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1 },
          { id: 2, title: 'Task 2', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1 },
          { id: 3, title: 'Task 3', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1 },
        ]
      },
      { name: 'In Progress', tasks: [
          { id: 4, title: 'Task 4', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1  },
          { id: 5, title: 'Task 5', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1  },
        ]
      },
      { name: 'Done', tasks: [
        { id: 6, title: 'Task 6', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1  },
        { id: 7, title: 'Task 7', assignedUserId: 'Marcel', description: 'nimic',state:'To Do', projectId: 1  },
      ] },
    ];
  }
}
