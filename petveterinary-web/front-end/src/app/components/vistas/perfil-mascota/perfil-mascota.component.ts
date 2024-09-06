import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from '../../../models/mascota';

@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrl: './perfil-mascota.component.css'
})
export class PerfilMascotaComponent implements OnInit{
  mascota: Mascota | null = null;
  mascotaId: string = '';

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    this.mascotaId = this.route.snapshot.paramMap.get('id') || '';
    this.loadMascotaDetails();
  }

  loadMascotaDetails(): void {
    this.mascotaService.obtenerMascotaPorId(this.mascotaId).subscribe(
      (data: Mascota) => {
        this.mascota = data;
      },
      error => {
        console.error('Error al cargar la información de la mascota:', error);
      }
    );
  }
}
