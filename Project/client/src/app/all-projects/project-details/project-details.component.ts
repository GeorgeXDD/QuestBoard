import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/task/task.component';
import { Task } from 'src/app/shared/model/task.model';

interface TaskColumn {
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: number;
  taskColumns: TaskColumn[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  openCreateTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: { task, isEditMode: !!task }
    });
  
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = Number(params.get('id'));
      this.mockTaskColumns();
    });
  }

  onTaskMoved(event: any): void {
    const task: Task = event.item.data;
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
  
  
  private removeFromColumn(task: Task, sourceColumn: TaskColumn): void {
    const taskIndex = sourceColumn.tasks.indexOf(task);
    if (taskIndex !== -1) {
      sourceColumn.tasks.splice(taskIndex, 1);
    }
  }
  
  private addToColumn(task: Task, targetColumn: TaskColumn, index: number): void {
    targetColumn.tasks.splice(index, 0, task);
  }

  private mockTaskColumns(): void {
    this.taskColumns = [
      { name: 'To Do', tasks: [
          { id: 1, title: 'Task 1', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
          { id: 2, title: 'Task 2', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
          { id: 3, title: 'Task 3', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
        ]
      },
      { name: 'In Progress', tasks: [
          { id: 4, title: 'Task 4', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
          { id: 5, title: 'Task 5', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
        ]
      },
      { name: 'Done', tasks: [
        { id: 6, title: 'Task 6', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
        { id: 7, title: 'Task 7', assignTo: 'Marcel', description: 'nimic',state:'To Do' },
      ] },
    ];
  }
}
