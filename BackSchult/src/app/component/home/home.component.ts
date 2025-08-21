import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  stats: any = {};
  loading = true;
  error = '';

  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('radarChartCanvas') radarChartCanvas!: ElementRef<HTMLCanvasElement>;
  barChart: any;
  pieChart: any;
  lineChart: any;
  radarChart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        setTimeout(() => this.renderCharts(), 0);
      },
      error: () => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.loading && !this.error) {
      this.renderCharts();
    }
  }

  renderCharts() {
    if (!this.barChartCanvas || !this.pieChartCanvas || !this.lineChartCanvas || !this.radarChartCanvas) return;
    const values = [
      this.stats.commandes || 0,
      this.stats.factures || 0,
      this.stats.utilisateurs || 0,
      this.stats.stocks || 0,
      this.stats.materiaux || 0,
      this.stats.fournisseurs || 0
    ];
    const labels = ['Commandes', 'Factures', 'Utilisateurs', 'Stocks', 'Matériaux', 'Fournisseurs'];
    const colors = [
      '#007ad9', '#dc3545', '#17a2b8', '#ffc107', '#28a745', '#6f42c1'
    ];

    // Bar Chart
    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Total',
          data: values,
          backgroundColor: colors,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1200, easing: 'easeOutBounce' },
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Statistiques globales (barres)' }
        }
      }
    });

    // Pie Chart
    if (this.pieChart) this.pieChart.destroy();
    this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Répartition',
          data: values,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1500, easing: 'easeInOutQuart' },
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Répartition des entités (camembert)' }
        }
      }
    });

    // Line Chart
    if (this.lineChart) this.lineChart.destroy();
    this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Évolution',
          data: values,
          borderColor: '#007ad9',
          backgroundColor: 'rgba(0,122,217,0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1200, easing: 'easeInOutCubic' },
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Évolution des entités (ligne)' }
        }
      }
    });

    // Radar Chart
    if (this.radarChart) this.radarChart.destroy();
    this.radarChart = new Chart(this.radarChartCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Répartition radar',
          data: values,
          backgroundColor: 'rgba(40,167,69,0.15)',
          borderColor: '#28a745',
          pointBackgroundColor: colors,
          pointBorderColor: '#fff',
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1300, easing: 'easeInOutBack' },
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Radar des entités' }
        }
      }
    });
  }
}
