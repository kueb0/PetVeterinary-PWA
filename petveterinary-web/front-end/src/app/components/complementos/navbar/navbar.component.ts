import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loader = true;
  isLoggedIn = false;
  nombre: string | null = null;

  constructor(private authServices: AuthServices, private router: Router) {}

  logout(): void {
    this.authServices.logout().subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al desloguear:', error);
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/Login']);
  }
  ngOnInit():void {
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
    this.isLoggedIn = localStorage.getItem('token') !== null;
    this.nombre = localStorage.getItem('nombre');
  }

  handleSearch(event: any): void {
    const searchTerm = (event.target as HTMLInputElement)?.value;
    if (searchTerm) {
      // Tu lógica de búsqueda aquí
      console.log(searchTerm);
    }
  }

}
