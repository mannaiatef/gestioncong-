import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Commande, CommandeService } from 'src/app/service/commande.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  providers: [MessageService, ConfirmationService]
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  loading = true;

  constructor(
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commandeService: CommandeService
  ) { }

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      data => {
        this.commandes = data;
        this.loading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des commandes'
        });
        this.loading = false;
      }
    );
  }

  editCommande(id: number): void {
    this.router.navigate(['/dashboard/commandes/modifier', id]);
  }

  deleteCommande(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette commande?',
      accept: () => {
        this.commandeService.deleteCommande(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Commande supprimée avec succès'
            });
            this.loadCommandes();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression de la commande'
            });
          }
        );
      }
    });
  }
}