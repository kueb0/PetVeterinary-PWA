import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private propietarioNombre: string = '';
  private mascotaNombre: string = '';

  constructor() {}

  setPropietarioNombre(nombre: string): void {
    this.propietarioNombre = nombre;
  }

  getPropietarioNombre(): string {
    return this.propietarioNombre;
  }

  setMascotaNombre(nombre: string): void {
    this.mascotaNombre = nombre;
  }

  getMascotaNombre(): string {
    return this.mascotaNombre;
  }
}
