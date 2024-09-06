import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  protected aFormGroup!: FormGroup;
  formulario: FormGroup;
  loader = true;
  hide = true;
  showPasswordResetLink = false;

  constructor(private authServices: AuthServices, private router: Router, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  async onSubmit2() {
    try {
      const response = await this.authServices.login(this.formulario.value);
      if (!response.error) {
        setTimeout(() => {
          this.router.navigate(['/Verify']);
        }, 2000);
      } else {
        this.showErrorPopup();
      }
    } catch (error) {
      console.error(error);
      this.showErrorPopup();
    }
  }

  
  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Correo o contraseña incorrectos!"
    });
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Bienvenido!",
      text: "Haz iniciado sesión correctamente!",
      icon: "success"
    });
  }
}
