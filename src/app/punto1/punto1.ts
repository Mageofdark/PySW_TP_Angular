import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  standalone: true,
  templateUrl: './punto1.html',
  styleUrls: ['./punto1.css']
})
export class Punto1Component {
  eventos = [
    { nombre: 'Taller de Yoga', descripcion: 'Relájate y mejora tu flexibilidad con nuestro taller de yoga.', img: 'evento01.jpg' },
    { nombre: 'Conferencia de Tecnología', descripcion: 'Descubre las últimas tendencias en tecnología e innovación.', img: 'evento02.jpg' },
    { nombre: 'Festival de Música', descripcion: 'Disfruta de conciertos en vivo con artistas locales e internacionales.', img: 'evento03.jpg' }
  ];

  indiceActual = 0;

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }

  siguiente() {
    if (this.indiceActual < this.eventos.length - 1) {
      this.indiceActual++;
    }
  }
}