import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Commande, CommandeService } from 'src/app/service/commande.service';

@Component({
  selector: 'app-commande-detail',
  templateUrl: './commande-detail.component.html',
  providers: [MessageService]
})
export class CommandeDetailComponent implements OnInit {
  commande: Commande | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadCommande(id);
  }

  loadCommande(id: number): void {
    this.commandeService.getCommandeById(id).subscribe(
      data => {
        this.commande = data;
        this.loading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement de la commande'
        });
        this.loading = false;
      }
    );
  }
}