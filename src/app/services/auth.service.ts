import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.url_backend + '/api/auth/local', { identifier: username, password: password })
    .pipe(
      tap(data => sessionStorage.setItem('token', data.jwt))
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
}