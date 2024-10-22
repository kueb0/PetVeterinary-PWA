import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VeterinarioService {

    private baseUrl: string;
    router = inject(Router);

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:3000/api'; // Asegúrate de que esta URL sea correcta
    }

    registrarVeterinario(formValue: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/veterinario/registro`, formValue);
    }

    obtenerVeterinario(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/veterinario/todos`);
    }

    obtenerVeterinarioPorId(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/veterinario/${id}`);
    }

    eliminarVeterinario(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/veterinario/eliminar/${id}`);
    }

    obtenerHorariosDisponibles(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/veterinario/${id}/horarios`);
    }

    updateDisponibilidad(idVeterinario: string, dia: string, hora: string): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/veterinario/actualizar-disponibilidad`, { idVeterinario, dia, hora });
    }
    
}