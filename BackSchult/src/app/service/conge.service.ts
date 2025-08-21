import { Injectable } from '@angular/core';
import { DemandeConge } from '../model/demande-conge.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

private apiUrl = 'http://localhost:8089/conge';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getAllDemandes(): Observable<DemandeConge[]> {
    return this.http.get<DemandeConge[]>(`${this.apiUrl}/all`);
  }

  creerDemande(employeId: number, dateDebut: string, dateFin: string, motif: string): Observable<DemandeConge> {
    const params = new HttpParams()
      .set('employeId', employeId)
      .set('dateDebut', dateDebut)
      .set('dateFin', dateFin)
      .set('motif', motif);

    return new Observable(observer => {
      this.http.post<DemandeConge>(`${this.apiUrl}/creer`, {}, { params }).subscribe({
        next: (demande) => {
          // Notifier le RH de la nouvelle demande
          this.notificationService.notifyDemandeCreated(demande);
          observer.next(demande);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  validerDemande(id: number): Observable<DemandeConge> {
    return new Observable(observer => {
      this.http.put<DemandeConge>(`${this.apiUrl}/valider/${id}`, {}).subscribe({
        next: (demande) => {
          // Notifier l'employé que sa demande a été acceptée
          this.notificationService.notifyDemandeAccepted(demande);
          observer.next(demande);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  refuserDemande(id: number): Observable<DemandeConge> {
    return new Observable(observer => {
      this.http.put<DemandeConge>(`${this.apiUrl}/refuser/${id}`, {}).subscribe({
        next: (demande) => {
          // Notifier l'employé que sa demande a été refusée
          this.notificationService.notifyDemandeRefused(demande);
          observer.next(demande);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  supprimerDemande(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDemandesByChef(chefId: number) {
    return this.http.get<DemandeConge[]>(`${this.apiUrl}/chef/${chefId}/demandes`);
  }

}
