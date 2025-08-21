import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Commande, CommandeService } from 'src/app/service/commande.service';
import { Stock } from 'src/app/service/materials.service';
import { StockService } from 'src/app/service/stock.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  showDropdown = false;
  isDashboardHome = true;
  lowStockItems: Stock[] = [];
  pendingCommands: Commande[] = [];

  constructor(
    private router: Router,
    private stockService: StockService,
    private commandeService: CommandeService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.router.events.subscribe(() => {
      this.isDashboardHome = this.router.url === '/dashboard';
    });
    
    this.loadLowStockItems();
    this.loadPendingCommands();
  }

  loadUserInfo(): void {
    const user = this.tokenStorage.getUser();
    if (user && user.username) {
      this.userName = user.username;
    } else {
      // Fallback: essayer de récupérer depuis le token
      const token = this.tokenStorage.getToken();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userName = payload.username || payload.sub || 'Utilisateur';
        } catch {
          this.userName = 'Utilisateur';
        }
      }
    }
  }

  loadLowStockItems(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.lowStockItems = stocks.filter(s => s.currentQuantity <= s.threshold);
    });
  }

  loadPendingCommands(): void {
    this.commandeService.getCommandes().subscribe(commandes => {
      this.pendingCommands = commandes.filter(c => c.status === 'EN_COURS');
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAdminOrRH(): boolean {
    const role = this.tokenStorage.getUserRole();
    return role === 'ADMIN' || role === 'RH' || role === 'ROLE_ADMIN' || role === 'ROLE_RH';
  }
  isChef(): boolean {
    const role = this.tokenStorage.getUserRole();
    return role === 'CHEF' || role === 'ROLE_CHEF';
  }
}