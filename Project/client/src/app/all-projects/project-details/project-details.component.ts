import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/task/task.component';
import { TaskModel, TaskState } from 'src/app/shared/model/tasks/task.model';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ProjectModel } from 'src/app/shared/model/projects/project.model';
import { TaskService } from 'src/app/shared/services/task.service';

interface TaskColumn {
  name: string;
  state: string;
  tasks: TaskModel[];
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: number;
  project!: ProjectModel;
  taskColumns: TaskColumn[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = Number(params.get('id'));
      this.loadProjectDetails();
    });
  }

  loadProjectDetails(): void {
    this.projectService.ApiGetProject(this.projectId.toString()).subscribe(
      (project) => {
        this.project = project;
        this.taskColumns = this.mapTasksToColumns(project.tasks);
      },
      (error) => {
        console.error('Error loading project details:', error);
      }
    );
  }

  mapTasksToColumns(tasks: TaskModel[]): TaskColumn[] {
    const columns: TaskColumn[] = [
      { name: 'To Do', state: 'ToDo', tasks: tasks.filter(task => task.state === 'ToDo') },
      { name: 'In Progress', state: 'InProgress', tasks: tasks.filter(task => task.state === 'InProgress') },
      { name: 'Done', state: 'Done', tasks: tasks.filter(task => task.state === 'Done') },
    ];
    return columns;
  }
  

  openCreateTaskDialog(task?: TaskModel): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: {
        task,
        mode: 'new',
        projectId: this.projectId
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditTaskDialog(task?: TaskModel): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: {
        task,
        mode: 'edit',
        taskId: task!.id 
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  onTaskMoved(event: any): void {
    const task: TaskModel = event.item.data;
    const currentIndex: number = event.currentIndex;
  
    const sourceColumn: TaskColumn = this.taskColumns.find((column) => column.tasks.includes(task)) || { name: '', state: '', tasks: [] };
    const targetColumn: TaskColumn = this.taskColumns.find((column) => column.name === event.container.id) || { name: '', state: '', tasks: [] };
  
    this.removeFromColumn(task, sourceColumn);
    this.addToColumn(task, targetColumn, currentIndex);
  
    this.updateTaskState(task, targetColumn);

    this.cdr.detectChanges();
  }

  updateTaskState(task: TaskModel, targetColumn: TaskColumn): void {
    const taskId = task.id;
    const updatedTask = { ...task, state: targetColumn.state as TaskState };
  
    this.taskService.ApiTaskPut(updatedTask, taskId).subscribe( response =>
      this.ngOnInit()
    );
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
}
