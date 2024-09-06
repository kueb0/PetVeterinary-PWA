import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formulario: FormGroup;
  clienteServices = inject(ClienteService)
  router = inject(Router);
  loader = true;
  protected aFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      telefono: new FormControl(),
      direccion: new FormControl(),
      email: new FormControl(),
      contrasenia: new FormControl()
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, this.passwordValidator]]
    });
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const response = await this.clienteServices.registrarCliente(this.formulario.value);
      this.router.navigate(['/Inicio']);
    } else {
      console.log("El formulario no es válido. Por favor, corrige los campos.");
    }
  }

  passwordValidator(control: FormControl) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(control.value) ? null : { invalidPassword: true };
  }
}
