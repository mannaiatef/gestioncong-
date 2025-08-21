import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {
  fournisseurs: any[] = [];
  loading = true;
  searchTerm: string = '';
originalFournisseurs: any[] = [];

  constructor(
    private fournisseurService: FournisseurService,
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadFournisseurs();
  }



filterList(): void {
  const term = this.searchTerm.toLowerCase();
  this.fournisseurs = this.originalFournisseurs.filter(f =>
    f.name.toLowerCase().includes(term) ||
    f.contact.toLowerCase().includes(term) ||
    f.numtel.includes(term)
  );
}




addFournisseur(): void {
    this.router.navigate(['/dashboard/fournisseurs/ajouter']);
  }






 loadFournisseurs(): void {
  this.fournisseurService.getFournisseurs().subscribe(
    data => {
      this.fournisseurs = data;
      this.originalFournisseurs = data; // <- nécessaire pour restaurer après recherche
      this.loading = false;
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des fournisseurs'
      });
      this.loading = false;
    }
  );
}


  editFournisseur(id: number): void {
    this.router.navigate(['/dashboard/fournisseurs/modifier', id]);
  }

  deleteFournisseur(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce fournisseur?',
      accept: () => {
        this.fournisseurService.deleteFournisseur(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Fournisseur supprimé avec succès'
            });
            this.loadFournisseurs();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression du fournisseur'
            });
          }
        );
      }
    });
  }

  exportPdf() {
    const doc = new jsPDF();
    doc.text('Liste des Fournisseurs', 14, 15);
    autoTable(doc, {
      head: [['Nom', 'Contact', 'Téléphone']],
      body: this.fournisseurs.map(f => [f.name, f.contact, f.numtel]),
      startY: 20,
    });
    doc.save('fournisseurs.pdf');
  }
}