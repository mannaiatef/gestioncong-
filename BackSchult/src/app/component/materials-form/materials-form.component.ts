import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MaterialsService } from 'src/app/service/materials.service';

@Component({
  selector: 'app-materials-form',
  templateUrl: './materials-form.component.html',
  providers: [MessageService]
})
export class MaterialsFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  loading = false;
  categories = ['BOIS', 'PLASTIQUE', 'ACIER', 'CIMENT'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private materialsService: MaterialsService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      categorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.loadMaterial(id);
    }
  }

  loadMaterial(id: number): void {
    this.loading = true;
    this.materialsService.getMaterials().subscribe(materials => {
      const material = materials.find(m => m.id === +id);
      if (material) {
        this.form.patchValue(material);
      }
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const material = this.form.value;

    const operation = this.isEdit
      ? this.materialsService.updateMaterial(material.id, material)
      : this.materialsService.createMaterial(material);

    operation.subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: this.isEdit 
            ? 'Matériau mis à jour avec succès' 
            : 'Matériau créé avec succès'
        });
        this.router.navigate(['/dashboard/materials']);
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