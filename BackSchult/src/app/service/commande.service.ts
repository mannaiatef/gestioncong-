import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

export interface Commande {
  id: number;
  date: Date | string;
  status: string;
  totalAmount: number;
  fournisseur: any;
  factures?: Facture[];
}

export interface Facture {
  id: number;
  date: Date | string;
  totalAmount: number;
  commande?: Commande;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8089/commande';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  // Méthode pour obtenir les en-têtes avec le token
  private getHeaders(): HttpHeaders {
    const token = this.tokenStorage.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createCommande(commande: Commande): Observable<Commande> {
    console.log('Envoi de la commande:', commande);
    console.log('Token présent:', !!this.tokenStorage.getToken());
    console.log('En-têtes:', this.getHeaders());
    return this.http.post<Commande>(`${this.apiUrl}/add`, commande, { headers: this.getHeaders() });
  }

  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${id}`, commande, { headers: this.getHeaders() });
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}