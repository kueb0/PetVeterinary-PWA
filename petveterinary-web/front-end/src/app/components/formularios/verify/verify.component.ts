import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'] 
})
export class VerifyComponent {
  loader = true;
  formulario: FormGroup;

  constructor(private authServices: AuthServices, private router: Router,private formBuilder: FormBuilder) {
    this.formulario = new FormGroup({
      code: new FormControl()
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  async onSubmit() {
    try {
      const response = await this.authServices.verify(this.formulario.value);
      if (!response.error) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre', response.nombre);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('id', response._id);

        // Muestra el popup de éxito
        this.showCorrectPopup();

        // Redirige basado en el rol
        if (response.rol === 'Cliente') {
          this.router.navigate(['/ClienteSesion']);
        } else if (response.rol === 'Veterinario') {
          this.router.navigate(['/VeterinarioSesion']);
        } else {
          this.router.navigate(['/Inicio']);
        }
      } else {
        this.showErrorPopup();
      }
    } catch (error) {
      console.error(error);
      this.showErrorPopup();
    }
  }

  showCorrectPopup() {
    Swal.fire({
      title: "Bienvenido!",
      text: "Haz iniciado sesión correctamente!",
      icon: "success"
    });
  }

  showErrorPopup() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El código parece ser incorrecto!"
    });
  }
}
