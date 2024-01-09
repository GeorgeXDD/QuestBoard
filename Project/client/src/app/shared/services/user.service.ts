import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(protected http: HttpClient){}

  public basePath = "http://localhost:5000/api/Users";
  
  public ApiUsersGetAll(): Observable<User[]>{
    return this.http.get<User[]>(this.basePath);
  }
}
