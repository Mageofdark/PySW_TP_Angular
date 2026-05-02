import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  string = "¡Bienvenido a la sección de Acerca de Nosotros! Aquí encontrarás información sobre nuestra empresa, nuestra misión y visión, y el equipo que hace posible todo lo que hacemos. Nos apasiona brindar soluciones innovadoras y de alta calidad a nuestros clientes, y estamos comprometidos con la excelencia en cada proyecto que emprendemos. ¡Gracias por visitarnos!"
}
