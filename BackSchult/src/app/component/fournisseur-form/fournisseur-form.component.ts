import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FournisseurService } from 'src/app/service/fournisseur.service';

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css']
})
export class FournisseurFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private fournisseurService: FournisseurService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      contact: ['', [Validators.required, Validators.maxLength(100)]],
      numtel: ['', [Validators.required, Validators.maxLength(13)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.loadFournisseur(id);
    }
  }

  loadFournisseur(id: number): void {
    this.loading = true;
    this.fournisseurService.getFournisseurs().subscribe(fournisseurs => {
      const fournisseur = fournisseurs.find(f => f.id === +id);
      if (fournisseur) {
        this.form.patchValue(fournisseur);
      }
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const fournisseur = this.form.value;

    const operation = this.isEdit
      ? this.fournisseurService.updateFournisseur(fournisseur.id, fournisseur)
      : this.fournisseurService.createFournisseur(fournisseur);

    operation.subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: this.isEdit 
            ? 'Fournisseur mis à jour avec succès' 
            : 'Fournisseur créé avec succès'
        });
        this.router.navigate(['/dashboard/fournisseurs']);
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue'
        });
        this.loading = false;
      }
    );
  }
}
