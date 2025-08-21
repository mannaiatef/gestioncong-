import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    const allowedRoles = next.data['roles'] as string[] | undefined;
    if (allowedRoles) {
      const userRole = this.tokenStorage.getUserRole();
      if (!userRole || !allowedRoles.some(role => userRole === role || userRole === 'ROLE_' + role)) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}