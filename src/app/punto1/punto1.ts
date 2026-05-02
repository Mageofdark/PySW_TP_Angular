import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.html',
  styleUrls: ['./punto1.css']
})
export class Punto1Component {
  eventos = [
    { nombre: 'Taller de Yoga',
     descripcion: 'Relájate y mejora tu flexibilidad con nuestro taller de yoga.',
     img: 'evento01.jpg', },
    { nombre: 'Conferencia de Tecnología',
      descripcion: 'Descubre las últimas tendencias en tecnología e innovación.',
      img: 'evento02.jpg', },
    { nombre: 'Festival de Música',
      descripcion: 'Disfruta de conciertos en vivo con artistas locales e internacionales.',
      img: 'evento03.jpg', },
    { nombre: 'Convención de Manga/Anime',
      descripcion: 'Disfruta de la cultura japonesa con cosplay, concursos y más.',
      img: 'evento04.jpeg', },
    { nombre: 'Torneo de Videojuegos',
      descripcion: 'Compite en emocionantes torneos de videojuegos con premios increíbles.', 
      img: 'evento05.jpg', }
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