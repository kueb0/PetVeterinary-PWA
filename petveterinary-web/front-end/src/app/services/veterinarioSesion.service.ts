import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { VeterinarioSesion } from '../models/veterinarioSesion';


@Injectable({
    providedIn: 'root'
})
export class VeterinarioSesionService {

    private baseUrl: string;
    router = inject(Router);

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:3000/api'; // Asegúrate de que esta URL sea correcta
    }

    registrarVeterinario(formValue: any): Observable<any> {
        return this.http.post<VeterinarioSesion>(`${this.baseUrl}/veterinario/registro`, formValue);
    }

    obtenerVeterinario(): Observable<any[]> {
        return this.http.get<VeterinarioSesion[]>(`${this.baseUrl}/veterinario/todos`);
    }

    obtenerVeterinarioPorId(id: string): Observable<any> {
        return this.http.get<VeterinarioSesion>(`${this.baseUrl}/veterinario/vet/${id}`);
    }

    eliminarVeterinario(id: string): Observable<any> {
        return this.http.delete<VeterinarioSesion>(`${this.baseUrl}/veterinario/eliminar/${id}`);
    }

    obtenerHorariosDisponibles(id: string): Observable<any> {
        return this.http.get<VeterinarioSesion>(`${this.baseUrl}/veterinario/${id}/horarios`);
    }

    updateDisponibilidad(idVeterinario: string, dia: string, hora: string): Observable<any> {
        return this.http.put<VeterinarioSesion>(`${this.baseUrl}/veterinario/actualizar-disponibilidad`, { idVeterinario, dia, hora });
    }
    
}