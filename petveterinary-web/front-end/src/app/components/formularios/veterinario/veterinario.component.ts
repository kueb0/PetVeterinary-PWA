import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrl: './veterinario.component.css'
})
export class VeterinarioComponent {
  formulario: FormGroup;
  veterinarioServices = inject(VeterinarioService)
  router = inject(Router);
  loader = true;
  protected aFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      contrasenia: new FormControl(),
      cedulaProfesional: new FormControl()
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cedulaProfesional: ['', Validators.required],
      contrasenia: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const response = await this.veterinarioServices.registrarVeterinario(this.formulario.value);
      this.showCorrectPopup();
      this.router.navigate(['/Inicio']);
    } else {
      console.log("El formulario no es válido. Por favor, corrige los campos.");
      this.showErrorPopup();
    }
  }

  passwordValidator(control: FormControl) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(control.value) ? null : { invalidPassword: true };
  }

  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Parece que hubo un error al añadir al Veterinario!"
    });
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Excelente!",
      text: "Se ha añadido el veterinario!",
      icon: "success"
    });
  }
}
