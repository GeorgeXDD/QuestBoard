import { Injectable } from '@angular/core';
import { TaskModel } from '../model/tasks/task.model';
import { UserService } from './user.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private userService: UserService, private projectService: ProjectService) {}

  fetchUserAndProjectDetails(tasks: TaskModel[]): void {
    tasks.forEach(task => {
      this.userService.ApiGetUser(task.assignedUserId).subscribe(userDetails => {
        task.user = userDetails?.userName || '';
      });

      this.projectService.ApiGetProject(task.projectId).subscribe(projectDetails => {
        task.project = projectDetails?.title || '';
      });
    });
  }
}
