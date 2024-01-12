import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { ProjectModel } from '../shared/model/projects/project.model';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {
  projects: ProjectModel[] = [];
  showCreateProjectPopup: boolean = false;

  constructor(private router: Router, 
    private projectService: ProjectService,
    private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.projectService.ApiProjectGetAll().subscribe(projects => {
      this.projects = projects;
    });
  }

  navigateToProjectDetail(projectId: number): void {
    this.router.navigate(['/project', projectId]);
  }

  openCreateProjectDialog(project?: ProjectModel): void {
    const dialogRef = this.dialog.open(ProjectComponent, {
      width: '400px',
      data: {
        project,
        mode: 'new'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
