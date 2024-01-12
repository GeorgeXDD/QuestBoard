import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from '../shared/model/tasks/task.model';
import { TaskService } from '../shared/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { UserModel } from '../shared/model/users/user.model';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  users: UserModel[] = [];
  assignedUserDisplay!: string;

  constructor(
    private dialogRef: MatDialogRef<TaskComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { task?: TaskModel, mode: string, taskId: any, projectId: any },
    private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.data.mode === 'edit' && this.data.task) {
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        assignedUserId: ['', Validators.required],
        description: ['', Validators.required],
        state: ['', Validators.required],
      });
    }else{
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        assignedUserId: ['', Validators.required],
        description: ['', Validators.required],
        state: ['', Validators.required],
        projectId: [this.data.projectId, Validators.required]
      });
    }
    this.assignedUserDisplay = '';
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.task-popup-container')?.classList.add('active');
    }, 100);

    this.userService.ApiUsersGetAll().subscribe(users => {
      this.users = users;
    });

    if (this.data.mode === 'edit' && this.data.task) {
      this.taskForm.setValue({
        title: this.data.task.title,
        assignedUserId: this.data.task.assignedUserId,
        description: this.data.task.description,
        state: this.data.task.state,   
      });
      const selectedUser = this.users.find(user => user.id.toString() === this.data.task!.assignedUserId);
      this.assignedUserDisplay = selectedUser?.userName || '';
      
    }else if (this.data.mode != 'edit' && this.data.task) {
      this.taskForm.setValue({
        title: this.data.task.title,
        assignedUserId: this.assignedUserDisplay,
        description: this.data.task.description,
        state: this.data.task.state,
        projectId: this.data.projectId
      });
      this.assignedUserDisplay = this.data.task.user;
    }
  }

  saveTask(): void {
    const formData = this.taskForm.value;
    // formData.assignedUserId = this.taskForm.get('assignedUserId').value;
    if (this.data.mode === 'edit') {
      this.taskService.ApiTaskPut(formData, this.data.taskId).subscribe(updatedTask => {
      });
    } else if(this.data.mode != 'edit') {
      this.taskService.ApiTaskPost(formData).subscribe(newTask => {
      });
    }else{
      console.log("idk")
    }
    this.dialogRef.close();
  }

  deleteTask(): void {
    const confirmationDialog = this.dialog.open(ConfirmationComponent, {
      data: { message: 'Are you sure you want to delete this project?' },
      panelClass: 'custom-modal'
    });
  
    confirmationDialog.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.ApiTaskDelete(this.data.taskId).subscribe(() => {
          this.dialogRef.close();
        });
      }
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
