import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserProfile } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { UserProfileService } from '../../service/user-profile.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [MessageService]
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isEditing = false;
  isChangingPassword = false;
  isLoading = false;
  message = '';
  messageType = '';
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    this.userId = user && user.id ? user.id : null;
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    if (!this.userId) return;
    this.isLoading = true;
    this.userProfileService.getUserProfile(this.userId).subscribe({
      next: (user) => {
        this.userProfile = user;
        this.profileForm.patchValue({
          username: user.username,
          email: user.email || ''
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.showMessage('Erreur lors du chargement du profil', 'error');
        this.isLoading = false;
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserProfile(); // Recharger les données originales
    }
  }

  togglePasswordChange(): void {
    this.isChangingPassword = !this.isChangingPassword;
    if (!this.isChangingPassword) {
      this.passwordForm.reset();
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.userProfile && this.userId) {
      this.isLoading = true;
      const updatedProfile = {
        ...this.userProfile,
        ...this.profileForm.value
      };
      
      // Supprimer l'avatar pour le mettre à null
      updatedProfile.avatarUrl = null;
      
      this.userProfileService.updateProfile(this.userId, updatedProfile).subscribe({
        next: (user) => {
          this.userProfile = user;
          this.tokenStorage.saveUser(user);
          this.isEditing = false;
          this.isLoading = false;
          this.showMessage('Profil mis à jour avec succès!', 'success');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          this.showMessage('Erreur lors de la mise à jour du profil', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      const passwordData = this.passwordForm.value;

      this.userProfileService.changePassword(passwordData).subscribe({
        next: (response) => {
          this.isChangingPassword = false;
          this.passwordForm.reset();
          this.isLoading = false;
          this.showMessage('Mot de passe modifié avec succès!', 'success');
        },
        error: (error) => {
          console.error('Erreur lors du changement de mot de passe:', error);
          this.showMessage('Erreur lors du changement de mot de passe', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getRoleDisplayName(role: string | undefined): string {
    switch (role) {
      case 'ADMIN':
      case 'ROLE_ADMIN':
        return 'Administrateur';
      case 'RH':
      case 'ROLE_RH':
        return 'Ressources Humaines';
      case 'CHEF':
      case 'ROLE_CHEF':
        return 'Chef d\'équipe';
      default:
        return 'Utilisateur';
    }
  }

  getStatusDisplayName(isActive: boolean | undefined): string {
    return isActive ? 'Actif' : 'Inactif';
  }

  getStatusClass(isActive: boolean | undefined): string {
    return isActive ? 'status-active' : 'status-inactive';
  }

  showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
} 