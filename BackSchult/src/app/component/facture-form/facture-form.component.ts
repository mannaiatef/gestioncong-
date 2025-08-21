import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../../service/facture.service';
import { CommandeService, Commande, Facture } from '../../service/commande.service';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {
  factureForm: FormGroup;
  commandes: Commande[] = [];
  isEdit = false;
  factureId?: number;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private commandeService: CommandeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.factureForm = this.fb.group({
      date: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      commandeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.commandeService.getCommandes().subscribe({
      next: (data) => this.commandes = data,
      error: () => this.error = 'Erreur lors du chargement des commandes'
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.factureId = +id;
        this.loading = true;
        this.factureService.getFactureById(this.factureId).subscribe({
          next: (facture) => {
            this.factureForm.patchValue({
              date: facture.date
                ? (typeof facture.date === 'string'
                    ? (facture.date as string).slice(0, 10)
                    : (new Date(facture.date)).toISOString().slice(0, 10))
                : '',
              totalAmount: facture.totalAmount,
              commandeId: facture.commande?.id
            });
            this.loading = false;
          },
          error: () => {
            this.error = 'Erreur lors du chargement de la facture';
            this.loading = false;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.factureForm.invalid) return;
    const formValue = this.factureForm.value;
    const facture: Facture = {
      id: this.factureId || 0,
      date: formValue.date,
      totalAmount: formValue.totalAmount,
      commande: this.commandes.find(c => c.id == formValue.commandeId)
    };
    this.loading = true;
    if (this.isEdit && this.factureId) {
      this.factureService.updateFacture(this.factureId, facture).subscribe({
        next: () => this.router.navigate(['/dashboard/factures']),
        error: () => {
          this.error = 'Erreur lors de la modification';
          this.loading = false;
        }
      });
    } else {
      this.factureService.createFacture(facture).subscribe({
        next: () => this.router.navigate(['/dashboard/factures']),
        error: () => {
          this.error = 'Erreur lors de la création';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/factures']);
  }
}
