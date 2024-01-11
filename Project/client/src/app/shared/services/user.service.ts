import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../model/users/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private localStorageKey = 'userId';

  constructor(protected http: HttpClient){}

  public basePath = "http://localhost:5000/api/Users";
  
  public ApiUsersGetAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.basePath);
  }

  public ApiUserLogin(loginData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.basePath}/login`, loginData);
  }

  setUserIdInLocalStorage(userId: number): void {
    localStorage.setItem(this.localStorageKey, userId.toString());
  }

  getUserIdFromLocalStorage(): number | null {
    const userId = localStorage.getItem(this.localStorageKey);
    return userId ? +userId : null;
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  public ApiUserRegister(registerData: { username: string; password: string; email: string }): Observable<any> {
      return this.http.post(`${this.basePath}/register`, registerData);
    }
}
