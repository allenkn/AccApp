import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  registerNewUser(userData): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/users/`, userData);
  }
}