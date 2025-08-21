import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DemandeConge } from 'src/app/model/demande-conge.model';
import { ApiService } from 'src/app/service/api.service';
import { CongeService } from 'src/app/service/conge.service';
import { ChefEmployeesService } from 'src/app/service/chef-employees.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-chef-list',
  templateUrl: './chef-list.component.html',
  styleUrls: ['./chef-list.component.css']
})
export class ChefListComponent implements OnInit {
  chefs: User[] = [];
  demandes: DemandeConge[] = [];
  selectedChefId: number | null = null;
  employees: User[] = [];
  showForm = false;
  isChefUser = false;
  currentUserId: number | null = null;
  isLoadingEmployees = false;
  formData = {
    employeId: null as number | null,
    dateDebut: '',
    dateFin: '',
    motif: ''
  };

  constructor(
    private apiService: ApiService, 
    private congeService: CongeService,
    private chefEmployeesService: ChefEmployeesService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    console.log('ChefListComponent initializing...');
    this.checkUserRole();
  }

  checkUserRole(): void {
    const role = this.tokenStorage.getUserRole();
    console.log('User role:', role);
    this.isChefUser = role === 'CHEF' || role === 'ROLE_CHEF';
    console.log('Is chef user:', this.isChefUser);
    
    if (this.isChefUser) {
      // Si c'est un chef, récupérer son ID et charger ses employés directement
      this.currentUserId = this.tokenStorage.getUserId();
      console.log('Current user ID from token:', this.currentUserId);
      
      if (this.currentUserId) {
        this.selectedChefId = this.currentUserId;
        console.log('Selected chef ID:', this.selectedChefId);
        this.loadChefData(this.currentUserId);
        this.showForm = true; // Afficher directement le formulaire
      } else {
        console.error('No user ID found in token');
      }
    } else {
      // Si c'est admin/RH, charger la liste des chefs
      this.apiService.getChefs().subscribe((data) => {
        this.chefs = data;
        console.log('Loaded chefs for admin/RH:', data);
      });
    }
  }

  loadChefData(chefId: number): void {
    console.log('Loading chef data for ID:', chefId);
    
    // Charger les employés du chef
    this.isLoadingEmployees = true;
    this.chefEmployeesService.getEmployeesByChef(chefId).subscribe({
      next: (data) => {
        console.log('Employees loaded successfully:', data);
        this.employees = data;
        this.isLoadingEmployees = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoadingEmployees = false;
        this.employees = [];
      }
    });
    
    // Charger les demandes du chef
    this.congeService.getDemandesByChef(chefId).subscribe({
      next: (data) => {
        console.log('Demandes loaded successfully:', data);
        this.demandes = data;
      },
      error: (error) => {
        console.error('Error loading demandes:', error);
        this.demandes = [];
      }
    });
  }

  onChefChange() {
    if (this.selectedChefId) {
      this.loadChefData(this.selectedChefId);
    } else {
      this.employees = [];
      this.demandes = [];
    }
  }

  toggleForm() {
    if (this.isChefUser) {
      // Pour les chefs, le formulaire est toujours visible
      return;
    }
    this.showForm = !this.showForm;
  }

  createDemande() {
    if (this.formData.employeId && this.formData.dateDebut && this.formData.dateFin && this.formData.motif) {
      console.log('Creating demande with data:', this.formData);
      this.congeService.creerDemande(
        this.formData.employeId,
        this.formData.dateDebut,
        this.formData.dateFin,
        this.formData.motif
      ).subscribe({
        next: () => {
          console.log('Demande created successfully');
          if (!this.isChefUser) {
            this.showForm = false;
          }
          this.formData = {
            employeId: null,
            dateDebut: '',
            dateFin: '',
            motif: ''
          };
          // Recharger les demandes
          if (this.selectedChefId) {
            this.loadChefData(this.selectedChefId);
          }
        },
        error: (error) => {
          console.error('Error creating demande:', error);
        }
      });
    } else {
      console.log('Form validation failed:', this.formData);
    }
  }
} 