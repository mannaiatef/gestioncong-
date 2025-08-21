import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandeService, Commande } from '../../service/commande.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { FournisseurService, Fournisseur } from '../../service/fournisseur.service';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {
  commandeForm: FormGroup;
  fournisseurs: Fournisseur[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private fournisseurService: FournisseurService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.commandeForm = this.fb.group({
      date: [null, Validators.required],
      status: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      fournisseurId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data) => this.fournisseurs = data,
      error: () => this.error = 'Erreur lors du chargement des fournisseurs'
    });
  }

  onSubmit() {
    if (this.commandeForm.invalid) return;
    const formValue = this.commandeForm.value;
    const commande: Commande = {
      id: 0,
      date: this.formatDate(formValue.date),
      status: formValue.status,
      totalAmount: formValue.totalAmount,
      fournisseur: { id: Number(formValue.fournisseurId) }
    };
    this.loading = true;
    this.commandeService.createCommande(commande).subscribe({
      next: () => this.router.navigate(['/dashboard/commandes']),
      error: () => {
        this.error = 'Erreur lors de la création';
        this.loading = false;
      }
    });
  }

  private formatDate(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    const d = value as Date;
    const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    return utc.toISOString().slice(0, 10);
  }

  cancel() {
    this.router.navigate(['/dashboard/commandes']);
  }
}
