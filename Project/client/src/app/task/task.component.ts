import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from '../shared/model/tasks/task.model';
import { TaskService } from '../shared/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: TaskModel, mode: string, taskId: any, projectId: any },
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    console.log(this.data.projectId);
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
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.task-popup-container')?.classList.add('active');
    }, 100);

    if (this.data.mode === 'edit' && this.data.task) {
      this.taskForm.setValue({
        title: this.data.task.title,
        assignedUserId: this.data.task.assignedUserId,
        description: this.data.task.description,
        state: this.data.task.state,
        projectId: this.data.projectId        
      });
    }else if (this.data.mode != 'edit' && this.data.task) {
      this.taskForm.setValue({
        title: this.data.task.title,
        assignedUserId: this.data.task.assignedUserId,
        description: this.data.task.description,
        state: this.data.task.state,
        projectId: this.data.projectId    
      });
    }
  }

  saveTask(): void {
    const formData = this.taskForm.value;
    if (this.data.mode === 'edit') {
      this.taskService.ApiTaskPut(formData, this.data.taskId).subscribe(updatedTask => {
        console.log('Task updated:', updatedTask);
      });
    } else if(this.data.mode != 'edit') {
      this.taskService.ApiTaskPost(formData).subscribe(newTask => {
        console.log('New task created:', newTask);
      });
    }else{
      console.log("idk")
    }
    this.dialogRef.close();
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
