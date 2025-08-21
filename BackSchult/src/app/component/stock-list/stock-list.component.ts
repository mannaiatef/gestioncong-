import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MaterialsService, Stock } from 'src/app/service/materials.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  providers: [MessageService, ConfirmationService]
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  materials: any[] = [];
  loading = true;

  constructor(
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private stockService: StockService,
    private materialsService: MaterialsService
  ) { }

  ngOnInit(): void {
    this.loadStocks();
    this.loadMaterials();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe(
      data => {
        this.stocks = data;
        this.loading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des stocks'
        });
        this.loading = false;
      }
    );
  }

  loadMaterials(): void {
    this.materialsService.getMaterials().subscribe(materials => {
      this.materials = materials.map(m => ({
        label: m.name,
        value: m.id
      }));
    });
  }

  editStock(id: number): void {
    this.router.navigate(['/dashboard/stock/modifier', id]);
  }

  deleteStock(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce stock?',
      accept: () => {
        this.stockService.deleteStock(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Stock supprimé avec succès'
            });
            this.loadStocks();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression du stock'
            });
          }
        );
      }
    });
  }
}