import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {
  mascota: any = {
    nombreMascota: '',
    sexo: '',
    edad: null,
    especie: '',
    foto: '',
    idCliente: '' // Este campo se manejará automáticamente
  };

  constructor(private http: HttpClient) {} //, //private authService: AuthService

  onEspecieChange(event: any) {
    const especie = event.target.value;
    if (especie === 'Perro') {
      this.mascota.raza = '';
      this.mascota.tamano = '';
    } else if (especie === 'Gato') {
      this.mascota.razaGato = '';
      this.mascota.esDomestico = false;
    } else if (especie === 'Ave') {
      this.mascota.tipoDeAve = '';
      this.mascota.puedeVolar = false;
    } else if (especie === 'Reptil') {
      this.mascota.tipoDeReptil = '';
      this.mascota.esVenenoso = false;
    } else if (especie === 'Roedor') {
      this.mascota.tipoDeRoedor = '';
      this.mascota.esDomestico = false;
    }
  }

  onSubmit() {
    // Obtener el ID del cliente desde el servicio de autenticación
    //this.mascota.idCliente = this.authService.getClienteId(); 

    const url = 'http://localhost:3000/api/mascota'; // URL de tu backend
    this.http.post(url, this.mascota).subscribe(
      response => {
        console.log('Mascota guardada:', response);
        // Manejar la respuesta de éxito
      },
      error => {
        console.error('Error al guardar la mascota:', error);
        // Manejar el error
      }
    );
  }
}
