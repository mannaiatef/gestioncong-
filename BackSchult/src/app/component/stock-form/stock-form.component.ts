import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { MaterialsService } from 'src/app/service/materials.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  providers: [MessageService]
})
export class StockFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  loading = false;
  materials: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private stockService: StockService,
    private materialsService: MaterialsService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      id: [null],
      currentQuantity: [0, [Validators.required, Validators.min(0)]],
      threshold: [0, [Validators.required, Validators.min(0)]],
      materiel: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMaterials();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.loadStock(id);
    }
  }

  loadMaterials(): void {
    this.materialsService.getMaterials().subscribe(materials => {
      this.materials = materials;
      console.log('Matériaux chargés:', this.materials); // Debug
    });
  }

  loadStock(id: number): void {
    this.loading = true;
    this.stockService.getStocks().subscribe(stocks => {
      const stock = stocks.find(s => s.id === +id);
      if (stock) {
        this.form.patchValue({
          ...stock,
          materiel: stock.materiel.id // Utiliser directement l'ID
        });
      }
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const stockData = this.form.value;
    
    // Vérifier que le matériel a un ID valide
    if (!stockData.materiel) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez sélectionner un matériel valide'
      });
      this.loading = false;
      return;
    }
    
    console.log('Données du stock à envoyer:', stockData); // Debug

    // Transformer les données pour le backend
    const stockForBackend = {
      ...stockData,
      materiel: { id: stockData.materiel.id } // Le backend attend { id: number }
    };

    console.log('Données transformées pour le backend:', stockForBackend);

    const operation = this.isEdit
      ? this.stockService.updateStock(stockData.id, stockForBackend)
      : this.stockService.createStock(stockForBackend);

    operation.subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: this.isEdit 
            ? 'Stock mis à jour avec succès' 
            : 'Stock créé avec succès'
        });
        this.router.navigate(['/dashboard/stock']);
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