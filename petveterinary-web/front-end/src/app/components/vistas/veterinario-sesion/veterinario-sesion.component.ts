import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeterinarioSesionService } from 'src/app/services/veterinarioSesion.service';
import { VeterinarioSesion } from 'src/app/models/veterinarioSesion';
import { Cita } from 'src/app/models/cita';
import { Mascota } from 'src/app/models/mascota';
import { CitasVeterinarioService } from 'src/app/services/citasVeterinario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veterinario-sesion',
  templateUrl: './veterinario-sesion.component.html',
  styleUrl: './veterinario-sesion.component.css'
})
export class VeterinarioSesionComponent implements OnInit {

  vet: VeterinarioSesion | null = null;
  //citas: Cita[] = [];
  citasA: Cita[] = [];
  citasP: Cita[] = [];
  mascotas: Mascota[] = [];
  mascota: any
  loader = true;
  errorMessage: string | null = null;
  idCita: string | null = null;

  constructor(
    private router: Router,
    private veterinarioSesionService: VeterinarioSesionService,
    private citasVeterinarioService: CitasVeterinarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);

    
    
    this.ObtenerDatosVeterinario();
    this.obtenerCitasA();
    this.obtenerCitasP();
  }

  private ObtenerDatosVeterinario(): void{
    const idVeterinario = localStorage.getItem('id'); // Obtener ID del cliente logueado
    if (idVeterinario) {
      this.veterinarioSesionService.obtenerVeterinarioPorId(idVeterinario).subscribe(
        (data: VeterinarioSesion) => {
          this.vet = data;
          
          
          
        },
        (error) => {
          console.error('Error al obtener las veterinario:', error);
          this.errorMessage = 'No se pudo obtener los datos del veterinario.';
          this.loader = false;          
          // this.showErrorPopup();
        }
      );
    } else {
      console.error('idVeterinario no encontrado en localStorage');
      this.loader = false;
      this.errorMessage = 'No se pudo obtener los datos del veterinario.';
      // this.showErrorPopup();
    }
  }

 
  private obtenerCitasA(): void {
    const idVeterinario = localStorage.getItem('id'); // Obtener ID del cliente logueado
    if (idVeterinario) { // Verifica que idVeterinario no sea null
      this.citasVeterinarioService.getCitasPorVeterinarioAntes(idVeterinario).subscribe(
        (data: Cita[]) => {
          this.citasA = data;
          this.loader = false;
        },
        (error) => {
          console.error('Error al obtener citas:', error);
          this.loader = false;
        }
      );
    } else {
      console.error('ID de veterinario no encontrado en localStorage.');
      this.loader = false;
    }
  }
  
  private obtenerCitasP(): void {
    const idVeterinario = localStorage.getItem('id'); // Obtener ID del cliente logueado
    if (idVeterinario) { // Verifica que idVeterinario no sea null
      this.citasVeterinarioService.getCitasPorVeterinarioProximas(idVeterinario).subscribe(
        (data: Cita[]) => {
          this.citasP = data;
          this.loader = false;
          console.log(this.citasP)
          this.route.paramMap.subscribe(params => {
            this.idCita = params.get('idCita');
            if (this.idCita) {
              this.obtenerMascotaCita();
            }
          });
        },
        (error) => {
          console.error('Error al obtener citas:', error);
          this.loader = false;
        }
      );
    } else {
      console.error('ID de veterinario no encontrado en localStorage.');
      this.loader = false;
    }
  }

  private obtenerMascotaCita(): void {
    if (this.idCita) { // Verifica que idVeterinario no sea null
      this.citasVeterinarioService.obtenerMascotaPorCita(this.idCita).subscribe(
        (data) => {
          this.mascota = data;
          this.loader = false;
          console.log(this.mascota)
        },
        (error) => {
          console.error('Error al obtener citas:', error);
          this.loader = false;
        }
      );
    } else {
      console.error('ID de veterinario no encontrado en localStorage.');
      this.loader = false;
    }
  }

}

