
/*
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthAnimationComponent } from './component/auth-animation/auth-animation.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FournisseurListComponent } from './component/fournisseur-list/fournisseur-list.component';
import { FournisseurFormComponent } from './component/fournisseur-form/fournisseur-form.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthAnimationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FournisseurListComponent,
    FournisseurFormComponent
  ],
  imports: [
      BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './service/auth.interceptor';

// PrimeNG Modules
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';




//zedtou 

import { ConfirmationService} from 'primeng/api';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthAnimationComponent } from './component/auth-animation/auth-animation.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
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
import { NotificationDropdownComponent } from './component/notification-dropdown/notification-dropdown.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { FactureListComponent } from './component/facture-list/facture-list.component';
import { FactureFormComponent } from './component/facture-form/facture-form.component';
import { CommandeFormComponent } from './component/commande-form/commande-form.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthAnimationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FournisseurListComponent,
    FournisseurFormComponent,
    MaterialsListComponent,
    MaterialsFormComponent,
    StockListComponent,
    StockFormComponent,
    CommandeListComponent,
    CommandeDetailComponent,
    DemandeCongeComponent,
    ChefListComponent,
    NotificationDropdownComponent,
    UserProfileComponent,
    UserManagementComponent,
    FactureListComponent,
    FactureFormComponent,
    CommandeFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    
    
   // PrimeNG Modules
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarModule,
    
    // RouterModule for in-module routes
    RouterModule.forRoot([
      { 
        path: 'dashboard/fournisseurs', 
        component: FournisseurListComponent 
      },
      { 
        path: 'dashboard/fournisseurs/ajouter', 
        component: FournisseurFormComponent 
      },
      { 
        path: 'dashboard/fournisseurs/modifier/:id', 
        component: FournisseurFormComponent 
      }
    ])
  ],
  providers: [
    MessageService, // Ajout du service PrimeNG
    ConfirmationService, // Ajout du service de confirmation
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }