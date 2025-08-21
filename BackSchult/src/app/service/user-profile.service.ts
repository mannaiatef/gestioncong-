import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../model/user.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private apiUrl = 'http://localhost:8089/admin';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenStorage.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUserProfile(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/getUserById/${id}`, { headers: this.getHeaders() });
  }

  updateProfile(id: number, profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/updateUser/${id}`, profileData, { headers: this.getHeaders() });
  }

  changePassword(passwordData: { currentPassword: string; newPassword: string; }): Observable<any> {
    // Endpoint pour changer le mot de passe
    return this.http.post<any>(`${this.apiUrl}/changePassword`, passwordData, { headers: this.getHeaders() });
  }

  uploadAvatar(file: File, userId?: number): Observable<{ avatarUrl: string }> {
    if (!userId) throw new Error('User ID is required for avatar upload');
    const formData = new FormData();
    formData.append('file', file);
    
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post<{ avatarUrl: string }>(`${this.apiUrl}/${userId}/avatar`, formData, { headers });
  }
} 