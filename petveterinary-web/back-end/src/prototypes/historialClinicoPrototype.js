class HistorialClinicoPrototype {
    constructor(historialClinico) {
      this.historialClinico = historialClinico;
    }
  
    clone() {
      return new HistorialClinicoPrototype(JSON.parse(JSON.stringify(this.historialClinico)));
    }
  
    personalizar(data) {
      Object.assign(this.historialClinico, data);
    }
  
    async save() {
      const nuevoHistorial = new HistorialClinico(this.historialClinico);
      return await nuevoHistorial.save();
    }
  }
  
  module.exports = HistorialClinicoPrototype;
  