import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Materials {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  categorie: string; // BOIS, PLASTIQUE, ACIER, CIMENT
  stockList?: Stock[];
}

export interface Stock {
  id: number;
  currentQuantity: number;
  threshold: number;
  materiel: Materials;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private apiUrl = 'http://localhost:8089/materials';

  constructor(private http: HttpClient) { }

  getMaterials(): Observable<Materials[]> {
    return this.http.get<Materials[]>(`${this.apiUrl}/list`);
  }

  createMaterial(material: Materials): Observable<Materials> {
    return this.http.post<Materials>(`${this.apiUrl}/ajouter`, material);
  }

  updateMaterial(id: number, material: Materials): Observable<Materials> {
    return this.http.put<Materials>(`${this.apiUrl}/${id}`, material);
  }

  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}