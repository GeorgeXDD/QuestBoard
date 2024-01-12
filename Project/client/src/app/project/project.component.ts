import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ProjectModel } from '../shared/model/projects/project.model';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projectForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProjectComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { project?: ProjectModel, mode: string},
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.task-popup-container')?.classList.add('active');
    }, 100);
    if (this.data.mode === 'edit' && this.data.project) {
      this.projectForm.patchValue({
        title: this.data.project.title,
        description: this.data.project.description
      });
    }
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;

      if (this.data.mode === 'new') {
        this.projectService.ApiProjectPost(formData).subscribe(newProject => {
          this.dialogRef.close();
        });
      } else if (this.data.mode === 'edit' && this.data.project) {
        this.projectService.ApiProjectPut(formData, this.data.project.id).subscribe(updatedProject => {
          this.dialogRef.close();
        });
      }
    }
  }

  deleteProject(): void {
    const confirmationDialog = this.dialog.open(ConfirmationComponent, {
      data: { message: 'Are you sure you want to delete this project?' },
      panelClass: 'custom-modal'
    });
  
    confirmationDialog.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.ApiProjectDelete(this.data.project!.id).subscribe(() => {
          this.router.navigate(['/dashboard']);
          this.dialogRef.close();
        });
      }
    });
  }
  
  

  closePopup(): void {
    this.dialogRef.close();
  }
}
