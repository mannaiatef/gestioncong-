import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8089/api/v1';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.tokenStorage.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getChefs() {
    return this.http.get<User[]>('http://localhost:8089/conge/chefs', { headers: this.getHeaders() });
  }
}