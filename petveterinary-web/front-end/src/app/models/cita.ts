export class Cita {
  _id?: String;
  hora: String;
  fecha: Date;
  estatus: 'atendida' | 'no atendida' | 'no se presentó'; 
  idVeterinario: String;
  idCliente: String;
  idMascota: String;
  motivo?: String;
  prescripciones?: String; 


  constructor(
    hora: String, 
    fecha: Date, 
    estatus: 'atendida' | 'no atendida' | 'no se presentó',
    idVeterinario: String,
    idCliente: String,
    idMascota: String,
    motivo?: String,
    prescripciones?: String,
  ) {
    this.hora = hora;
    this.fecha = fecha;
    this.estatus = estatus;
    this.motivo = motivo;
    this.prescripciones = prescripciones;
    this.idVeterinario = idVeterinario;
    this.idCliente = idCliente;
    this.idMascota = idMascota;
  }
}