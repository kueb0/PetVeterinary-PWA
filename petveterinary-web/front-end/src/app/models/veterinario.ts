export class Veterinario {
    _id?: number;
    nombre: String;
    telefono: String;
    email: String;
    contrasenia: String;
    cedulaProfesional: String

    constructor(nombre: String, telefono: String, email: String, contrasenia: String, cedulaProfesional: String
    ) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.contrasenia = contrasenia;
        this.cedulaProfesional = cedulaProfesional;
    }
}

