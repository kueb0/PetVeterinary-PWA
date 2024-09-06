export class VeterinarioSesion {
    _id?: String;
    nombre: String;
    telefono: String;
    email: String;
    contrasenia: String;
    cedulaProfesional: String;
    rol?: String;
    code?: number | null;
    horario?: Array<{
        dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
        horas: Array<{
            hora: String;
            disponible: boolean;
        }>
    }> = [];

    constructor(
        nombre: String, 
        telefono: String, 
        email: String, 
        contrasenia: String, 
        cedulaProfesional: String,
        rol?: String,
        code?: number | null,
        horario?: Array<{
            dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
            horas: Array<{
                hora: String;
                disponible: boolean;
            }>
        }>
    ) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.contrasenia = contrasenia;
        this.cedulaProfesional = cedulaProfesional;
        this.rol = rol;
        this.code = code;
        this.horario = horario || [];
    }
}

