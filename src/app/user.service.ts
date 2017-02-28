import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: Http, private requestOptions: RequestOptions) {
    this.retrieveUser();
  }

  register(login, password, birthYear): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}/api/users`, { login: login, password: password, birthYear: birthYear })
      .map((res: Response) => res.json());
  }

  authenticate(credentials: { login: string, password: string }): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}/api/users/authentication`, credentials)
      .map(res => res.json())
      .do(user => this.storeLoggedInUser(user));
  }

  storeLoggedInUser(user: UserModel): void {
    this.requestOptions.headers.set('Authorization', `Bearer ${user.token}`);
    this.userEvents.next(user);
    localStorage.setItem('rememberMe', JSON.stringify(user));
  }

  retrieveUser(): void {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe) {
      const user: UserModel = JSON.parse(rememberMe);
      this.requestOptions.headers.set('Authorization', `Bearer ${user.token}`);
      this.userEvents.next(user);
    }
  }

  logout(): void {
    this.requestOptions.headers.delete('Authorization');
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
  }

}
