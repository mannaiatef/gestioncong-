import { Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Fournisseur {
  id: number;
  name: string;
  contact: string;
  numtel: string;
}


@Injectable({
  providedIn: 'root'
})

export class FournisseurService {
  private apiUrl = `http://localhost:8089/fournisseur`;

  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiUrl}/list`);
  }

  createFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.apiUrl}/ajouter`, fournisseur);
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${id}`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
