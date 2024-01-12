import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __assign } from 'tslib';
import { ProjectModel } from '../model/projects/project.model';
import { ProjectPostModel } from '../model/projects/projectPost.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(protected http: HttpClient){}

  public basePath = "http://localhost:5000/api/Projects";
  
  public ApiProjectGetAll(): Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(this.basePath);
  }

  public ApiGetProject(id: string): Observable<ProjectModel>{
    return this.http.get<ProjectModel>(
      `${this.basePath}/${id}`,
    )
  }

  public ApiProjectPost(project: ProjectPostModel): Observable<ProjectPostModel>{
    return this.http.post<ProjectPostModel>(
      `${this.basePath}`,
      {
        title: project.title,
        description: project.description,
        tasks: project.tasks
      }
    )
  }

  public ApiProjectPut(project: ProjectModel, id:any): Observable<ProjectModel>{
    return this.http.put<ProjectModel>(
      `${this.basePath}/${id}`,
      project
    )
  }

  public ApiProjectDelete(id: number): Observable<ProjectModel>{
    return this.http.delete<ProjectModel>(
      `${this.basePath}/delete-project/${id}`
    )
  }
}
