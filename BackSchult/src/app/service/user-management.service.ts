import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private apiUrl = 'http://localhost:8089/admin';

  constructor(private http: HttpClient) {}

  getAllChefs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/chefs`);
  }

  getAllEmployes(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/employes`);
  }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/updateUser/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteUser/${id}`);
  }

  assignEmployeToChef(employeId: number, chefId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/assignEmployeToChef?employeId=${employeId}&chefId=${chefId}`, {});
  }
}
