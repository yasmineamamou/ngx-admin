import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.url_backend + '/api/auth/local', { identifier: username, password: password })
    .pipe(
      tap(data => {
        sessionStorage.setItem('token', data.jwt);
        sessionStorage.setItem('user', JSON.stringify(data.user));

      })
    );
  }
  getToken(): string {
    return sessionStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    return this.getToken() != undefined && this.getToken()!=''? true: false;
  }
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  verify(username: string, email: string): Promise<boolean> {
    const params = {
      username,
      email
    };
    return this.http
      .get<boolean>(environment.url_backend + '/api/users', { params })
      .toPromise();
  }
  getUserDepartment(): string {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user?.department; // Assuming the user object has a "department" field
  }
}
