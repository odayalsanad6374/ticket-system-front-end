import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { IAuthResponse } from '../model/auth-response';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private environment = environment;
  private http =inject(HttpClient);
  private readonly userKey = 'currentUser';

  login(userLogin: User): Observable<IAuthResponse> {
    const url = `${this.environment.apiUrl}/auth/login`;
     return this.http.post<IAuthResponse>(url, userLogin).pipe(
      tap((response) => {
        
        if (response.user) {
          localStorage.setItem(this.environment.jwtTokenKey, response.token);

          localStorage.setItem(this.userKey, JSON.stringify(response.user));
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }



  

}
