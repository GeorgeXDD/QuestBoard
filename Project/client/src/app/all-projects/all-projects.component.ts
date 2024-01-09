import { Component } from '@angular/core';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent {
  constructor(public user: UserService){
    console.log(user.ApiUsersGetAll().subscribe(user => console.log(user)));
  }
}
