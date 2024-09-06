import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import Swal from 'sweetalert2';
import { AuthServices } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {
  formulario: FormGroup;
  mascotaServices = inject(MascotaService);
  router = inject(Router);
  loader = true;
  isPerro = false;
  isAve = false;
  isGato = false;
  isReptil = false;
  isRoedor = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthServices, private userService: UserService) {
    this.formulario = new FormGroup({
      nombreMascota: new FormControl(),
      sexo: new FormControl(),
      edad: new FormControl(),
      especie: new FormControl(),
      foto: new FormControl()
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);

    this.formulario = this.formBuilder.group({
      nombreMascota: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', [Validators.required]],
      especie: ['', Validators.required],
      foto: ['', [Validators.required]],
      raza: [''],
      tamaño: [''],
      esDomestico: [''],
      tipoDeAve: [''],
      tipoDeReptil: [''],
      tipoDeRoedor: [''],
      puedeVolar: [null],
      esVenenoso: [null]
    });
  }

  onEspecieChange(event: Event) {
    const especie = (event.target as HTMLSelectElement).value;
    this.isPerro = especie === 'Perro';
    this.isAve = especie === 'Ave';
    this.isGato = especie === 'Gato';
    this.isReptil = especie === 'Reptil';
    this.isRoedor = especie === 'Roedor';
  }

  async onSubmit() {
    if (this.formulario.valid) {
      //const idCliente = this.userService.getIdCliente();
      const idCliente = localStorage.getItem('id');
      if (!idCliente) {
        console.error('idCliente no encontrado en localStorage');
        this.showErrorPopup();
        return;
      }

      const formData = {
        ...this.formulario.value,
        idCliente: idCliente
      };

      try {
        const response = await this.mascotaServices.registrarMascota(formData);
        this.showCorrectPopup();
        this.router.navigate(['/Inicio']);
        console.log(formData);
      } catch (error) {
        console.error('Error al registrar mascota:', error);
        console.error('Detalles del error:', error);
        this.showErrorPopup();
      }
    } else {
      console.log("El formulario no es válido. Por favor, corrige los campos.");
      this.showErrorPopup();
    }
  }

  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Parece que hubo un error al añadir a su mascota!"
    });
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Excelente!",
      text: "Se ha añadido su mascota!",
      icon: "success"
    });
  }
}
