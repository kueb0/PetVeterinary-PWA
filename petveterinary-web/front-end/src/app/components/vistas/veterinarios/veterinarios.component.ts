import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Veterinario } from 'src/app/models/veterinario';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import { ToastrService } from 'ngx-toastr';
import { InactivityService } from 'src/app/services/inactivity-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.css']
})
export class VeterinariosComponent {

  loading = true;
  loader = true;
  errorLoading: boolean = false;
  userRole: string | null = null;
  isAdmin2 = false;

  ngOnInit(): void {
    this.obtenerVeterinarios();
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.userRole = localStorage.getItem('rol');
    this.isAdmin();
    this.inactivityService.startTimer();
  }

  constructor(private _veterinarioService: VeterinarioService,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private inactivityService: InactivityService) {
  }

  listVeterinario: Veterinario[] = [];

  obtenerVeterinarios() {
    this._veterinarioService.obtenerVeterinario().subscribe((data: Veterinario[]) => {
      console.log(data);
      this.listVeterinario = data;
      this.loading = false;
    }, (error: any) => {
      console.log(error);
      this.loading = true;
      this.errorLoading = true;
    });
  }

  isAdmin() {
    if (this.userRole === "Admin") {
      this.isAdmin2 = true;
      console.log(this.isAdmin2);
    }
  }

  eliminarPaciente(id: any) {
    console.log('ID a eliminar:', id); // Agregar esta línea para verificar el ID
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás recuperar estos datos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._veterinarioService.eliminarVeterinario(id).subscribe(data => {
          this.obtenerVeterinarios();
        }, error => {
          console.log(error);
        });
      }
    });
  }
}