import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenStorage.getToken();
    
    console.log('Intercepteur HTTP - URL:', request.url);
    console.log('Intercepteur HTTP - Token:', token ? 'Présent' : 'Absent');
    
    if (token) {
      // Cloner la requête avec les nouveaux headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Headers ajoutés:', request.headers.get('Authorization'));
    } else {
      console.warn('Aucun token trouvé pour la requête:', request.url);
    }
    
    return next.handle(request);
  }
}