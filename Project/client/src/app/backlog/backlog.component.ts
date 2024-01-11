import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskModel } from '../shared/model/tasks/task.model';
import { UserModel } from '../shared/model/users/user.model';
import { ProjectService } from '../shared/services/project.service';
import { SharedService } from '../shared/services/shared.service';
import { TaskService } from '../shared/services/task.service';
import { UserService } from '../shared/services/user.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  tasks: TaskModel[] = [];
  user!: UserModel;

  constructor(private router: Router, 
    private dialog: MatDialog, 
    private projectService: ProjectService, 
    private userService: UserService,
    private sharedService: SharedService) {}


  ngOnInit(): void {
    const userId = this.userService.getUserIdFromLocalStorage();
  
    // if (userId) {
    //   this.userService.ApiGetUser(userId.toString()).subscribe(user => {
    //     if (user) {
    //       const currentUser = user;
    //       this.tasks = currentUser.tasks || [];

    //       this.tasks.forEach(task => {
    //         this.userService.ApiGetUser(task.assignedUserId).subscribe(userDetails => {
    //           task.user = userDetails!.userName || '';
    //         });

    //         this.projectService.ApiGetProject(task.projectId).subscribe(projectDetails => {
    //           task.project = projectDetails.title || '';
    //         });
    //       });
    //       console.log(this.tasks);
    //     }
    //   })
    // }
    if (userId) {
      this.userService.ApiGetUser(userId.toString()).subscribe(user => {
        if (user) {
          const currentUser = user;
          this.tasks = currentUser.tasks || [];  
          this.sharedService.fetchUserAndProjectDetails(this.tasks);

          console.log(this.tasks);
        }
      });
    }
  }
  
  

  editTask(task: TaskModel): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '400px',
      data: { task: task, mode: 'edit', taskId: task.id }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTaskList();
    });
  }

  private refreshTaskList(): void {
    this.ngOnInit();
  }
}
