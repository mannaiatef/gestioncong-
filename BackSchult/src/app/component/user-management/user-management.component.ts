import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from 'src/app/service/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  chefs: User[] = [];
  employes: User[] = [];
  filteredChefs: User[] = [];
  filteredEmployes: User[] = [];

  userForm: FormGroup;
  editForm: FormGroup;

  selectedChefId: number | null = null;
  selectedEmployeId: number | null = null;
  message = '';

  // recherche
  chefSearch = '';
  empSearch = '';

  constructor(
    private userService: UserManagementService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['EMPLOYE', Validators.required],
      chefId: [null]
    });

    this.editForm = this.fb.group({
      id: [null],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['EMPLOYE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadChefs();
    this.loadEmployes();
  }

  // chargements
  loadChefs() {
    this.userService.getAllChefs().subscribe(data => {
      this.chefs = data;
      this.applyChefFilter();
    });
  }

  loadEmployes() {
    this.userService.getAllEmployes().subscribe(data => {
      this.employes = data;
      this.applyEmpFilter();
    });
  }

  // filtres
  applyChefFilter() {
    const term = this.chefSearch.toLowerCase();
    this.filteredChefs = this.chefs.filter(c =>
      (c.username || '').toLowerCase().includes(term) || (c.email || '').toLowerCase().includes(term)
    );
  }

  applyEmpFilter() {
    const term = this.empSearch.toLowerCase();
    this.filteredEmployes = this.employes.filter(e =>
      (e.username || '').toLowerCase().includes(term) || (e.email || '').toLowerCase().includes(term)
    );
  }

  // création
  onSubmit() {
    if (this.userForm.invalid) { this.message = 'Formulaire invalide'; return; }
    const formValue = this.userForm.value;
    const user: any = {
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      role: formValue.role
    };
    if (formValue.role === 'EMPLOYE' && formValue.chefId) {
      user.chef = { id: formValue.chefId };
    }
    this.userService.addUser(user).subscribe({
      next: (created: User) => {
        const chefId = formValue.chefId as number | null;
        if (formValue.role === 'EMPLOYE' && chefId && created && created.id) {
          this.userService.assignEmployeToChef(created.id, chefId).subscribe({
            next: () => {
              this.message = 'Utilisateur créé et assigné au chef avec succès';
              this.loadChefs();
              this.loadEmployes();
              this.userForm.reset({ role: 'EMPLOYE' });
            },
            error: () => {
              this.message = "Utilisateur créé, mais l'assignation au chef a échoué";
              this.loadChefs();
              this.loadEmployes();
            }
          });
        } else {
          this.message = 'Utilisateur créé avec succès';
          this.loadChefs();
          this.loadEmployes();
          this.userForm.reset({ role: 'EMPLOYE' });
        }
      },
      error: () => this.message = 'Erreur lors de la création'
    });
  }

  // assignation
  assignEmployeToChef() {
    if (!this.selectedEmployeId || !this.selectedChefId) { this.message = 'Sélection invalide'; return; }
    this.userService.assignEmployeToChef(this.selectedEmployeId, this.selectedChefId).subscribe({
      next: () => {
        this.message = 'Employé assigné au chef avec succès';
        this.loadEmployes();
      },
      error: () => this.message = 'Erreur lors de l\'assignation'
    });
  }

  // promotion
  promoteToChef(employe: User) {
    if (!employe.id) { return; }
    this.userService.updateUser(employe.id, { role: 'CHEF' }).subscribe({
      next: () => {
        this.message = 'Employé promu chef';
        this.loadChefs();
        this.loadEmployes();
      },
      error: () => this.message = 'Erreur lors de la promotion'
    });
  }

  // modification
  startEdit(user: User) {
    this.editForm.patchValue({ id: user.id, username: user.username, email: user.email, role: user.role || 'EMPLOYE' });
  }

  saveEdit() {
    const v = this.editForm.value;
    if (!v.id || this.editForm.invalid) { this.message = 'Formulaire modification invalide'; return; }
    this.userService.updateUser(v.id, { username: v.username, email: v.email, role: v.role }).subscribe({
      next: () => {
        this.message = 'Utilisateur modifié';
        this.loadChefs();
        this.loadEmployes();
      },
      error: () => this.message = 'Erreur lors de la modification'
    });
  }

  // suppression
  deleteUser(user: User) {
    if (!user.id) { return; }
    if (!confirm(`Supprimer l'utilisateur ${user.username} ?`)) { return; }
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.message = 'Utilisateur supprimé';
        this.loadChefs();
        this.loadEmployes();
      },
      error: () => this.message = 'Erreur lors de la suppression'
    });
  }

  // utilitaires
  getChefNameForEmploye(emp: any): string {
    return emp?.chef?.username ? `Chef: ${emp.chef.username}` : 'Aucun chef';
  }
}
