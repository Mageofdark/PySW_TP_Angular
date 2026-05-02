import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  string = "¡Bienvenido a la sección de Inicio! Aquí encontrarás una visión general de nuestros servicios, noticias y actualizaciones. Nos esforzamos por ofrecer contenido relevante y útil para nuestros visitantes, y estamos comprometidos con la excelencia en todo lo que hacemos. ¡Gracias por visitarnos!"
}
