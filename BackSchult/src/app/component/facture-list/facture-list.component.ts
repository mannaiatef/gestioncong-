import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../service/facture.service';
import { Facture } from '../../service/commande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  factures: Facture[] = [];
  loading = false;
  error = '';

  constructor(private factureService: FactureService, private router: Router) {}

  ngOnInit(): void {
    this.fetchFactures();
  }

  fetchFactures() {
    this.loading = true;
    this.factureService.getFactures().subscribe({
      next: (data) => {
        this.factures = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des factures';
        this.loading = false;
      }
    });
  }

  addFacture() {
    this.router.navigate(['/dashboard/factures/ajouter']);
  }

  editFacture(id: number) {
    this.router.navigate(['/dashboard/factures/modifier', id]);
  }

  deleteFacture(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette facture ?')) {
      this.factureService.deleteFacture(id).subscribe({
        next: () => this.fetchFactures(),
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }
}
