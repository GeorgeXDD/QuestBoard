import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __assign } from 'tslib';
import { TaskModel } from '../model/tasks/task.model';
import { TaskPostModel } from '../model/tasks/taskPost.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(protected http: HttpClient){}

  public basePath = "http://localhost:5000/api/Tasks";
  
  public ApiTaskGetAll(): Observable<TaskModel[]>{
    return this.http.get<TaskModel[]>(this.basePath);
  }

  public ApiGetTask(id: string): Observable<TaskModel>{
    return this.http.get<TaskModel>(
      `${this.basePath}/${id}`,
    )
  }

  public ApiTaskPost(task: TaskPostModel): Observable<TaskPostModel>{
    return this.http.post<TaskPostModel>(
      `${this.basePath}`,
      {
        title: task.title,
        assignedUserId: task.assignedUserId,
        description: task.description,
        state: task.state,
        projectId: task.projectId
      }
    )
  }

  public ApiTaskPut(task: TaskModel, id:any): Observable<TaskModel>{
    return this.http.put<TaskModel>(
      `${this.basePath}/${id}`,
      task
    )
  }

  public ApiTaskDelete(id: string): Observable<TaskModel>{
    return this.http.delete<TaskModel>(
      `${this.basePath}/delete-task/${id}`,
    )
  }
}
