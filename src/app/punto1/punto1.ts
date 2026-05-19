import { CommonModule } from '@angular/common'; // Importa funcionalidades comunes de Angular (directivas como *ngIf, *ngFor, etc.)
import { Component } from '@angular/core'; // Importa el decorador Component para crear componentes

@Component({ // Decorador que define la configuración del componente
  selector: 'app-punto1', // Nombre de la etiqueta HTML que representa este componente
  standalone: true, // Indica que el componente es independiente y no necesita un módulo
  imports: [CommonModule], // Importa CommonModule para usar directivas comunes en el HTML
  templateUrl: './punto1.html', // Archivo HTML asociado al componente
  styleUrls: ['./punto1.css'] // Archivo CSS asociado al componente
})
export class Punto1Component { // Clase principal del componente

  eventos = [ // Array que almacena los eventos que se mostrarán en el carrusel

    { // Primer objeto del array
      nombre: 'Taller de Yoga', // Nombre del evento
      descripcion: 'Relájate y mejora tu flexibilidad con nuestro taller de yoga.', // Descripción del evento
      img: 'evento01.jpg', // Imagen asociada al evento
    },

    { // Segundo objeto del array
      nombre: 'Conferencia de Tecnología', // Nombre del evento
      descripcion: 'Descubre las últimas tendencias en tecnología e innovación.', // Descripción del evento
      img: 'evento02.jpg', // Imagen asociada al evento
    },

    { // Tercer objeto del array
      nombre: 'Festival de Música', // Nombre del evento
      descripcion: 'Disfruta de conciertos en vivo con artistas locales e internacionales.', // Descripción del evento
      img: 'evento03.jpg', // Imagen asociada al evento
    },

    { // Cuarto objeto del array
      nombre: 'Convención de Manga/Anime', // Nombre del evento
      descripcion: 'Disfruta de la cultura japonesa con cosplay, concursos y más.', // Descripción del evento
      img: 'evento04.jpeg', // Imagen asociada al evento
    },

    { // Quinto objeto del array
      nombre: 'Torneo de Videojuegos', // Nombre del evento
      descripcion: 'Compite en emocionantes torneos de videojuegos con premios increíbles.', // Descripción del evento
      img: 'evento05.jpg', // Imagen asociada al evento
    }

  ]; // Fin del array de eventos

  indiceActual = 0; // Variable que indica qué evento se está mostrando actualmente

  anterior() { // Método para ir al evento anterior

    if (this.indiceActual > 0) { // Verifica que no esté en el primer evento
      this.indiceActual--; // Resta 1 al índice para mostrar el evento anterior
    }

  }

  siguiente() { // Método para ir al siguiente evento

    if (this.indiceActual < this.eventos.length - 1) { // Verifica que no sea el último evento
      this.indiceActual++; // Suma 1 al índice para mostrar el siguiente evento
    }

  }

}