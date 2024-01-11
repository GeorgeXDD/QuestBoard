import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../shared/model/projects/project.model';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {
  projects: ProjectModel[] = [];

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.ApiProjectGetAll().subscribe(projects => {
      this.projects = projects;
    });
  }

  navigateToProjectDetail(projectId: number): void {
    this.router.navigate(['/project', projectId]);
  }
}
