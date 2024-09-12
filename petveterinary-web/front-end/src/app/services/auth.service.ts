import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  private baseUrl: string;
  router = inject(Router);
  private userService = inject(UserService);


  constructor(private http: HttpClient) {
    this.baseUrl = 'https://veterinaria-backend-gx0i.onrender.com/api'
  }

  login(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/auth/login`, formValue)
    )
  }

  verify(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/auth/verify`, formValue)
    )
  }

  logout(): Observable<any> {
    return from(
      this.http.post<any>(`${this.baseUrl}/auth/logout`, {})
    ).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        localStorage.removeItem('jwt');
        localStorage.removeItem('rol');
        localStorage.removeItem('id');
        this.router.navigate(['/login']);
      })
    );
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
        // 'authorization': this.userService.getToken() || ''
      })
    }
  }

  restablecerPassword(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/forgot-password`, formValue)
    )
  }

  getUserRole(): string | null {
    return localStorage.getItem('rol');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isVeterinario(): boolean {
    return this.getUserRole() === 'Veterinario';
  }

  isCliente(): boolean {
    return this.getUserRole() === 'Cliente';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = localStorage.getItem('rol');
    return roles.includes(userRole!);
  }

}

