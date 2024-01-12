import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ProjectDetailsComponent } from './all-projects/project-details/project-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BacklogComponent } from './backlog/backlog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './shared/guards/authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'projects', component: AllProjectsComponent,canActivate: [AuthGuardService]},
  { path: 'project/:id', component: ProjectDetailsComponent,canActivate: [AuthGuardService]},
  { path: 'backlog', component: BacklogComponent,canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

