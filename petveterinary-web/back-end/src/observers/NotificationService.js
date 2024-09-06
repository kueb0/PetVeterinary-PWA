// src/observers/NotificationService.js

class NotificationService {
  constructor() {
    if (!NotificationService.instance) {
      this.observers = [];
      NotificationService.instance = this; // Guardar la instancia creada
    }

    return NotificationService.instance; // Retornar la instancia única
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Exportar una instancia única de NotificationService
module.exports = new NotificationService();
