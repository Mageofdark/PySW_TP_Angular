import { Component, signal } from '@angular/core'; // Importa Component para crear componentes y signal para variables reactivas
import { RouterOutlet, RouterLink } from '@angular/router'; // Importa RouterOutlet para mostrar rutas y RouterLink para navegación
import { ThemeService } from './services/theme-service'; // Importa el servicio encargado del tema oscuro/claro
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas comunes como ngIf y ngFor

@Component({ // Decorador que define la configuración del componente
  selector: 'app-root', // Nombre de la etiqueta HTML principal del componente
  imports: [RouterOutlet, RouterLink, CommonModule], // Módulos y componentes que utilizará este componente
  templateUrl: './app.html', // Archivo HTML asociado al componente
  styleUrl: './app.css' // Archivo CSS asociado al componente
})
export class App { // Declaración de la clase principal App
  protected readonly title = signal('TP_Angular'); // Signal reactiva que almacena el título de la aplicación
  
  // Tema modo oscuro / claro
  constructor(private themeService: ThemeService) {} // Inyecta el servicio de temas en el constructor
 
  ngOnInit() { // Método que se ejecuta automáticamente al iniciar el componente
    this.themeService.initTheme(); // Inicializa el tema guardado o el tema por defecto
  }
 
  toggleTheme() { // Método para cambiar entre modo oscuro y claro
    this.themeService.toggleTheme(); // Llama al método del servicio que cambia el tema
  }
  get theme(){ // Getter para obtener el tema actual
    return this.themeService.currentTheme(); // Devuelve el tema actual desde el servicio
  }
}