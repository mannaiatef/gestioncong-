import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']); // Redirect to your main page
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        
        // Extraire les informations complètes de l'utilisateur depuis le token
        const userInfo = this.tokenStorage.getUser();
        this.tokenStorage.saveUser(userInfo);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isLoading = false;
        
        const role = this.tokenStorage.getUserRole();
        if (role === 'ADMIN' || role === 'RH' || role === 'ROLE_ADMIN' || role === 'ROLE_RH') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'CHEF' || role === 'ROLE_CHEF') {
          this.router.navigate(['/dashboard/chefs']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.errorMessage = err.error.message || 'Login failed';
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
  }
}