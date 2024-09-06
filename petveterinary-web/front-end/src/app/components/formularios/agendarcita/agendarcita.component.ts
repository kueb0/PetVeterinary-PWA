import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agendarcita',
  templateUrl: './agendarcita.component.html',
  styleUrls: ['./agendarcita.component.css']
})
export class AgendarCitaComponent implements OnInit {
  loader = true;
  formulario: FormGroup;
  horariosDisponibles: any[] = [];
  veterinarios: any[] = [];
  nombreMascota: string = '';
  nombreCliente: string = '';
  veterinarioSeleccionado: string = '';
  idMascota: string | null = null;

  constructor(
    private citaService: CitaService,
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotaService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      idVeterinario: new FormControl('', Validators.required),
      idCliente: new FormControl(''),
      propietarioNombre: new FormControl({ value: '', disabled: true }, Validators.required),
      mascotaNombre: new FormControl({ value: '', disabled: true }, Validators.required),
      fecha: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.nombreCliente = localStorage.getItem('nombre') ?? '';
    this.formulario.patchValue({
      propietarioNombre: this.nombreCliente,
      mascotaNombre: this.nombreMascota
      
    });
    this.sharedDataService.setPropietarioNombre(this.nombreCliente);

    const clientId = localStorage.getItem('id');
    this.formulario.patchValue({
      idCliente: clientId
    });

 
    // Recuperar el ID de la mascota desde la ruta
    this.route.paramMap.subscribe(params => {
    //const idMascota = params.get('idMascota');
    this.idMascota = params.get('idMascota');
    if (this.idMascota) {
      this.mascotaService.obtenerMascotaPorId(this.idMascota).subscribe(
        (mascota) => {
          this.nombreMascota = mascota.nombreMascota;
          this.formulario.patchValue({ mascotaNombre: this.nombreMascota });
          this.sharedDataService.setMascotaNombre(this.nombreMascota);
        },
        (error) => {
          console.error('Error al obtener mascota:', error);
        }
      );
    }
  });


    this.loadVeterinarios();

    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  loadVeterinarios() {
    this.veterinarioService.obtenerVeterinario().subscribe(
      (response) => {
        this.veterinarios = response;
      },
      (error) => {
        console.error('Error al obtener veterinarios:', error);
      }
    );
  }

  onVeterinarioChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const veterinarioId = target.value;

    this.veterinarioSeleccionado = veterinarioId;
    this.formulario.patchValue({ idVeterinario: veterinarioId });

    if (veterinarioId) {
        this.veterinarioService.obtenerHorariosDisponibles(veterinarioId).subscribe(
            (response) => {
                console.log('Datos recibidos del servicio:', response); // Verifica la estructura de los datos
                this.horariosDisponibles = response.flatMap((diaHorario: { horas: { hora: any; }[]; dia: any; }) =>
                    diaHorario.horas.map((hora: { hora: any; }) => ({
                        dia: diaHorario.dia,
                        hora: hora.hora
                    }))
                );
                console.log('Horarios Disponibles:', this.horariosDisponibles); // Verifica los horarios filtrados
            },
            (error) => {
                console.error('Error al obtener horarios:', error);
            }
        );
    }
}

  
  onSubmit() {
    if (this.formulario.valid && this.idMascota) {
      const horarioSeleccionado = this.formulario.value.hora;
      const hora = this.horariosDisponibles.find(h => h.hora === horarioSeleccionado);
  
      if (hora) {
        // Combina la fecha y la hora seleccionadas
        const fechaCitaCompleta = new Date(
          this.formulario.value.fecha + ' ' + this.formulario.value.hora
        );
  
        const nuevaCita = {
          ...this.formulario.value,
          fecha: fechaCitaCompleta.toISOString(),
          idMascota: this.idMascota
        };
  
        // Imprime el formulario como JSON en la consola
        console.log(JSON.stringify(nuevaCita));
  
        this.citaService.createCita(nuevaCita).subscribe(
          (response) => {
            console.log('Cita creada:', response);
  
            // Actualiza la disponibilidad
            const dia = this.getDiaDeLaSemana(new Date(nuevaCita.fecha));
            this.veterinarioService.updateDisponibilidad(this.formulario.value.idVeterinario, dia, horarioSeleccionado).subscribe(
              (updateResponse) => {
                console.log('Disponibilidad actualizada:', updateResponse);
                this.showCorrectPopup();
                this.router.navigate(['/citas-confirmadas']);
              },
              (error) => {
                console.error('Error al actualizar la disponibilidad:', error);
                this.showErrorPopup();
              }
            );
          },
          (error) => {
            console.error('Error al agendar cita:', error);
            this.showErrorPopup();
          }
        );
      } else {
        console.error('Horario seleccionado no válido.');
        this.showErrorPopup();
      }
    } else {
      console.log("El formulario no es válido. Por favor, corrige los campos.");
      this.showErrorPopup();
    }
  }
  
  
  getDiaDeLaSemana(fecha: Date): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[fecha.getDay()];
  }
  
  

  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Parece que hubo un error al añadir la cita!"
    });
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Excelente!",
      text: "Se ha añadido la cita!",
      icon: "success"
    });
  }
}
