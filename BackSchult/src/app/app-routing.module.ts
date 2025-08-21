import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './service/auth.guard';
import { FournisseurListComponent } from './component/fournisseur-list/fournisseur-list.component';
import { FournisseurFormComponent } from './component/fournisseur-form/fournisseur-form.component';
import { MaterialsListComponent } from './component/materials-list/materials-list.component';
import { MaterialsFormComponent } from './component/materials-form/materials-form.component';
import { StockListComponent } from './component/stock-list/stock-list.component';
import { StockFormComponent } from './component/stock-form/stock-form.component';
import { CommandeListComponent } from './component/commande-list/commande-list.component';
import { CommandeDetailComponent } from './component/commande-detail/commande-detail.component';
import { DemandeCongeComponent } from './component/demande-conge/demande-conge.component';
import { ChefListComponent } from './component/chef-list/chef-list.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { FactureListComponent } from './component/facture-list/facture-list.component';
import { FactureFormComponent } from './component/facture-form/facture-form.component';
import { CommandeFormComponent } from './component/commande-form/commande-form.component';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'chefs', component: ChefListComponent, canActivate: [AuthGuard], data: { roles: ['CHEF', 'ADMIN'] } },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'materials', component: MaterialsListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'materials/ajouter', component: MaterialsFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'materials/modifier/:id', component: MaterialsFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'stock', component: StockListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'stock/ajouter', component: StockFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'stock/modifier/:id', component: StockFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'fournisseurs', component: FournisseurListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'fournisseurs/ajouter', component: FournisseurFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'fournisseurs/modifier/:id', component: FournisseurFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'commandes', component: CommandeListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'commandes/ajouter', component: CommandeFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'commandes/:id', component: CommandeDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'demandes-conge', component: DemandeCongeComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserManagementComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'factures', component: FactureListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'factures/ajouter', component: FactureFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      { path: 'factures/modifier/:id', component: FactureFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RH'] } },
      //{ path: 'chefs', component: ChefListComponent }
      //{ path: 'factures', component: FactureListComponent },
      //{ path: 'factures/ajouter', component: FactureFormComponent },
      //{ path: 'factures/modifier/:id', component: FactureFormComponent }
     // { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
