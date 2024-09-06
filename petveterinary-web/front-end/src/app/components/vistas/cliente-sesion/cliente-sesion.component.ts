import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InactivityService } from 'src/app/services/inactivity-service.service';
import { MascotaService } from 'src/app/services/mascota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-sesion',
  templateUrl: './cliente-sesion.component.html',
  styleUrl: './cliente-sesion.component.css'
})
export class ClienteSesionComponent {
  mascotas: any[] = [];
  router = inject(Router);
  mascotaServices = inject(MascotaService);
  loader = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    
    this.obtenerMascotasDelUsuario();
  }

  obtenerMascotasDelUsuario() {
    const idCliente = localStorage.getItem('id'); // Obtener ID del cliente logueado
    if (idCliente) {
      this.mascotaServices.obtenerMascotaPorCliente(idCliente).subscribe(
        (data) => {
          this.mascotas = data; // Guardar las mascotas en la variable del componente
        },
        (error) => {
          console.error('Error al obtener las mascotas:', error);
          this.showErrorPopup();
        }
      );
    } else {
      console.error('id no encontrado en localStorage');
      this.showErrorPopup();
    }
  }

  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Parece que hubo un error al obtener sus mascotas!"
    });
  }
}
