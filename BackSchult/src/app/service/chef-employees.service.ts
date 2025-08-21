import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChefEmployeesService {
  private apiUrl = 'http://localhost:8089';

  constructor(private http: HttpClient) {}

  getEmployeesByChef(chefId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/chef/${chefId}/employees`);
  }
} 