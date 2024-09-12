import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private baseUrl: string;
    router = inject(Router);


    constructor(private http: HttpClient) {
        this.baseUrl = 'https://veterinaria-backend-gx0i.onrender.com/api'
    }

    registrarCliente(formValue: any) {
        return firstValueFrom(
            this.http.post<any>(`${this.baseUrl}/cliente/registro`, formValue)
        )
    }

    obtenerClientes(): Promise<any> {
        return firstValueFrom(
            this.http.get<any>(`${this.baseUrl}/clientes/todos`)
        );
    }

    obtenerClientePorId(id: string): Promise<any> {
        return firstValueFrom(
            this.http.get<any>(`${this.baseUrl}/clientes/${id}`)
        );
    }

}

