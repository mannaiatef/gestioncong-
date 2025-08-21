import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Materials, MaterialsService } from 'src/app/service/materials.service';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  providers: [MessageService, ConfirmationService]
})
export class MaterialsListComponent implements OnInit {
  materials: Materials[] = [];
  loading = true;

  constructor(
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private materialsService: MaterialsService
  ) { }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialsService.getMaterials().subscribe(
      data => {
        this.materials = data;
        this.loading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des matériaux'
        });
        this.loading = false;
      }
    );
  }

  editMaterial(id: number): void {
    this.router.navigate(['/dashboard/materials/modifier', id]);
  }

  deleteMaterial(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce matériau?',
      accept: () => {
        this.materialsService.deleteMaterial(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Matériau supprimé avec succès'
            });
            this.loadMaterials();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression du matériau'
            });
          }
        );
      }
    });
  }
}