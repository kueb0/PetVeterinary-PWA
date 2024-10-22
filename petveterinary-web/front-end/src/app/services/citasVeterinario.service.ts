
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Cita } from '../models/cita';
import { Mascota } from '../models/mascota';

@Injectable({
  providedIn: 'root'
})
export class CitasVeterinarioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCitasPorVeterinario(idVeterinario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cita/citas/veterinario/${idVeterinario}`);
  }

  getCitasPorVeterinarioProximas(idVeterinario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cita/citas/veterinarioP/${idVeterinario}`);
  }

  getCitasPorVeterinarioAntes(idVeterinario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cita/citas/veterinarioA/${idVeterinario}`);
  }

  getMascotasPorCliente(idCliente: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mascotas/${idCliente}`);
  }

  obtenerMascotaPorCita(idCita: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/citas/${idCita}/mascota`);
  }

  // obtenerCitaPorId(idCita: string): Observable<Cita> {
  //   return this.http.get<Cita>(`${this.apiUrl}/cita/${idCita}`);
  // }

  obtenerCitaPorId(idCita: string): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/cita/${idCita}`).pipe(
      map(data => {
        // Realiza cualquier transformación necesaria aquí
        return data;
      }),
      catchError(error => {
        console.error('Error al obtener la cita:', error);
        return of(null as unknown as Cita);
      })
    );
  }

  actualizarCita(idCita: string, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/cita/actualiza/${idCita}`, cita).pipe(
      catchError(error => {
        console.error('Error al actualizar la cita:', error);
        return throwError(error);
      })
    );
  }

  

}
