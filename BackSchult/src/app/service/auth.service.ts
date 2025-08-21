import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, RegisterResponse, User } from '../model/user.model';
import { Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private apiUrl = 'http://localhost:8089/api/v1';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        this.tokenStorage.saveToken(response.token);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.tokenStorage.getToken();
    this.tokenStorage.signOut();
    return this.http.post(`${this.apiUrl}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }
}
