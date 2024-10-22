import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MascotaService {

    private baseUrl: string;
    router = inject(Router);


    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:3000/api'
    }

    registrarMascota(formValue: any) {
        return firstValueFrom(
            this.http.post<any>(`${this.baseUrl}/mascota/`, formValue)
        )
    }

    // registrarMascota(formValue: any): Observable<any> {
    //     return this.http.post<any>(`${this.baseUrl}/mascota/`, formValue);
    //   }

    obtenerMascotas(): Observable<any> {
        return this.http.get<any[]>(`${this.baseUrl}/mascota/`);
    }

    obtenerMascotaPorId(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/mascota/${id}`);
    }

    eliminarMascota(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/mascota/${id}`);
    }

    obtenerMascotaPorCliente(idCliente: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/mascota/cliente/${idCliente}`)
    }

}

