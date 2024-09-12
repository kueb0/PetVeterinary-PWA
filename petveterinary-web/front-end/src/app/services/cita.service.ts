import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CitaService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = 'https://veterinaria-backend-gx0i.onrender.com/api';
    }

    createCita(cita: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/cita`, cita).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error al crear la cita:', error);
                return throwError(() => new Error('Error al crear la cita'));
            })
        );
    }

    updateDisponibilidad(idVeterinario: string, dia: string, hora: string): Observable<any> {
        const url = `${this.baseUrl}/cita/horario/updateDisponibilidad`;
        const body = { idVeterinario, dia, hora };
        console.log(body);
        return this.http.post<any>(url, body).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error al actualizar la disponibilidad:', error);
                return throwError(() => new Error('Error al actualizar la disponibilidad'));
            })
        );
    }

    
}
