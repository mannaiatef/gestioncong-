import { Component, OnInit } from '@angular/core';
import { DemandeConge } from 'src/app/model/demande-conge.model';
import { CongeService } from 'src/app/service/conge.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.css']
})
export class DemandeCongeComponent implements OnInit {
  demandes: DemandeConge[] = [];

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.chargerDemandes();
  }

  chargerDemandes() {
    this.congeService.getAllDemandes().subscribe((data) => {
      this.demandes = data;
    });
  }

  valider(id: number) {
    this.congeService.validerDemande(id).subscribe(() => {
      this.chargerDemandes();
    });
  }

  refuser(id: number) {
    this.congeService.refuserDemande(id).subscribe(() => {
      this.chargerDemandes();
    });
  }

  supprimer(id: number) {
    this.congeService.supprimerDemande(id).subscribe(() => {
      this.chargerDemandes();
    });
  }
}
