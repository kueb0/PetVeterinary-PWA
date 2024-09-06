import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LOCAL_STORAGE_KEYS = {
    ID_CLIENTE: 'idCliente',
    TOKEN: 'token',
    // Agrega otras claves si es necesario
  };

  getIdCliente(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEYS.ID_CLIENTE);
  }

  getToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEYS.TOKEN);
  }

  // Puedes agregar más métodos si es necesario
}
