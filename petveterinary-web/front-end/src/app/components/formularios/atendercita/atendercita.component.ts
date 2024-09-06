import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { VeterinarioSesion } from 'src/app/models/veterinarioSesion';
import { CitasVeterinarioService } from 'src/app/services/citasVeterinario.service';
import { VeterinarioSesionService } from 'src/app/services/veterinarioSesion.service';

@Component({
  selector: 'app-atendercita',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './atendercita.component.html',
  styleUrl: './atendercita.component.css'
})
export class AtendercitaComponent implements OnInit{
  
  cita: Cita | null = null; 
  citasA: Cita[] = [];
  citaId: string | null = null; 
  citaForm: FormGroup;
  loader: boolean = true;
  
  

  constructor(
    private fb: FormBuilder, 
    private citasVeterinarioService: CitasVeterinarioService,
    private route: ActivatedRoute
  ) { 
    // Inicializa el formulario
    this.citaForm = this.fb.group({
    _id: [''],
    hora: [''],
    fecha: [''],
    estatus: [''],
    motivo: [''],
    idVeterinario: [''],
    idCliente: [''],
    idMascota: [''],
    prescripciones: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idCita = params.get('idCita');
      if (idCita) {
        this.citaId = idCita;
        this.obtenerCita(idCita);
      }
    });

    
  }
    
  obtenerCita(idCita: string): void {
    this.citasVeterinarioService.obtenerCitaPorId(idCita).subscribe(
      (data: Cita) => {
        this.cita = data;
        this.citaForm.patchValue(data);
        console.log('Datos de cita recibidos:', data);
        this.loader = false; // Oculta el loader
      },
      (error) => {
        console.error('Error al obtener la cita:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.citaForm.valid) {
      const formData = this.citaForm.value;
      formData._id = this.citaId; 
       // Actualizar el campo estatus a "atendida"
       formData.estatus = 'atendida';

      // Aquí puedes enviar los datos al servidor si es necesario
      console.log('Formulario enviado con los datos:', formData);
      // Ejemplo de envío de datos al servidor
      this.citasVeterinarioService.actualizarCita(formData._id, formData).subscribe(
        (response) => {
          console.log('Cita actualizada exitosamente', response);
        },
        (error) => {
          console.error('Error al actualizar la cita:', error);
        }
      );
    } else {
      console.log('El formulario no es válido.');
    }
  }

}


 


