export class Mascota {
    _id?: number;
    nombreMascota: String;
    sexo: String;
    edad: Number;
    especie: String;
    foto: String

    constructor(nombreMascota: String, sexo: String, edad: Number, especie: String, foto: String
    ) {
        this.nombreMascota = nombreMascota;
        this.sexo = sexo;
        this.edad = edad;
        this.especie = especie;
        this.foto = foto;
    }
}

