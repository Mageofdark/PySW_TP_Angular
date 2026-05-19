// Importa el decorador Component para definir componentes en Angular
import { Component } from '@angular/core';

// Importa herramientas para formularios reactivos y validaciones
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Importa el servicio de cursos
import { CursosService } from '../../services/cursos-service';

// Importa el servicio de inscripciones
import { InscripcionesService } from '../../services/inscripciones-service';

// Importa CommonModule para usar directivas como ngIf y ngFor
import { CommonModule } from '@angular/common';

// Importa la interfaz OnInit para ejecutar código al iniciar el componente
import { OnInit } from '@angular/core';

// Decorador que define la configuración del componente
@Component({

  // Nombre de la etiqueta HTML del componente
  selector: 'app-inscripciones-component',

  // Módulos que utilizará este componente
  imports: [CommonModule, ReactiveFormsModule],

  // Archivo HTML asociado al componente
  templateUrl: './inscripciones-component.html',

  // Archivo CSS asociado al componente
  styleUrls: ['./inscripciones-component.css'],

  // Indica que es un componente standalone
  standalone: true,
})

// Declaración de la clase del componente
export class InscripcionesComponent implements OnInit{

  // Array que almacenará todas las inscripciones
  inscripciones: {

    // DNI del usuario
    dni: string;

    // Email del usuario
    email: string;

    // Categoría del usuario
    categoria: string;

    // Curso elegido
    curso: string;

    // Fecha seleccionada
    fecha: Date;

    // Precio final pagado
    precio: number;

  // Tipo del array
  }[] = [];

  // Objeto que almacenará el resumen de cursos
  resumencursos: {

    // Clave dinámica con el nombre del curso
    [curso: string]:{

      // Cantidad de estudiantes
      estudiantes: number;

      // Cantidad de egresados
      egresados: number;

      // Cantidad de particulares
      particulares: number;

      // Total general
      general: number;
    }

  // Inicializa el objeto vacío
  } ={};

  // Constructor del componente
  constructor(

    // Inyección del servicio de cursos
    private cursosService: CursosService,

    // Inyección del servicio de inscripciones
    private inscripcionesService: InscripcionesService

  ){}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void{

    // Obtiene las inscripciones guardadas
    this.inscripciones = this.inscripcionesService.getInscripciones();

    // Calcula el resumen inicial
    this.calcularResumen();
  }

  // Getter para acceder fácilmente a los cursos
  get cursos(){

    // Devuelve el array de cursos del servicio
    return this.cursosService.cursos;
  }
  
  // FORMULARIO REACTIVO
  form = new FormGroup({

    // Campo DNI obligatorio
    dni: new FormControl('', [Validators.required]),

    // Campo email obligatorio y validado como email
    email: new FormControl('', [Validators.required, Validators.email]),

    // Campo categoría obligatorio
    categoria: new FormControl('', [Validators.required]),

    // Campo curso obligatorio
    curso: new FormControl('', [Validators.required]),

    // Campo fecha obligatorio
    fecha: new FormControl('', [Validators.required]),
  });

  // Variable para almacenar el precio final numérico
  precioFinal = 0;

  // Variable para almacenar el precio final con texto y divisa
  precioFinalYDivisa = '';

  // Método para calcular el precio final
  calcularPrecio() {

    // Obtiene el nombre del curso seleccionado
    const cursoNombre = this.form.value.curso;

    // Busca el curso correspondiente
    const curso = this.cursos.find(c => c.nombre === cursoNombre);

    // Si no encuentra el curso, termina el método
    if(!curso) return;

    // Guarda el precio base del curso
    let precio = curso.precio;

    // Obtiene la categoría seleccionada
    const categoria = this.form.value.categoria;

    // Si es estudiante
    if(categoria === 'estudiante'){

      // Aplica 35% de descuento
      precio *= 0.65;

    // Si es egresado
    }else if(categoria === 'egresado'){

      // Aplica 50% de descuento
      precio *= 0.5;

    // Si es particular no aplica descuento
    }// else -> no hay descuento porque es particular

    // Guarda el precio final
    this.precioFinal = precio;

    // Guarda el precio con texto de moneda
    this.precioFinalYDivisa = precio + " ARS";
  }

  // Método para registrar la inscripción
  registrar(){

    // Verifica si el formulario es inválido
    if(this.form.invalid){

      // Marca todos los campos como tocados
      this.form.markAllAsTouched();

      // Muestra datos en consola
      console.log('Datos form: ', this.form.value, this.precioFinal);

      // Muestra alerta de error
      alert('NO SE ENVIO')

      // Sale del método
      return;
    }

    // Crea un objeto inscripción
    const inscripcion = {

      // Guarda el DNI
      dni: this.form.value.dni!,

      // Guarda el email
      email: this.form.value.email!,

      // Guarda la categoría
      categoria: this.form.value.categoria!,

      // Guarda el curso
      curso: this.form.value.curso!,

      // Convierte la fecha a objeto Date
      fecha: new Date(this.form.value.fecha!),

      // Guarda el precio calculado
      precio: this.precioFinal
    }

    // Agrega la inscripción al servicio
    this.inscripcionesService.agregar(inscripcion);

    // Muestra datos del formulario en consola
    console.log('Datos form: ', this.form.value, this.precioFinal);

    // Muestra todas las inscripciones en consola
    console.log('Array inscripciones', this.inscripcionesService.getInscripciones());

    // Actualiza el array local de inscripciones
    this.inscripciones = this.inscripcionesService.getInscripciones();

    // Recalcula el resumen
    this.calcularResumen();

    // Muestra mensaje de éxito
    alert('ENVIADO')

    // Reinicia el formulario
    this.form.reset();

    // Reinicia el precio final
    this.precioFinal = 0;

    // Limpia el texto del precio
    this.precioFinalYDivisa = '';

    // Finaliza el método
    return;

  }

  // Método para calcular el resumen de cursos
  calcularResumen(){

    // Reinicia el objeto resumen
    this.resumencursos = {};

    // Recorre todas las inscripciones
    this.inscripciones.forEach(i => {

      // Si el curso aún no existe en el resumen
      if(!this.resumencursos[i.curso]){

        // Crea la estructura inicial
        this.resumencursos[i.curso] = {

          // Inicializa estudiantes
          estudiantes: 0,

          // Inicializa egresados
          egresados: 0,

          // Inicializa particulares
          particulares: 0,

          // Inicializa total general
          general: 0
        }; 
      }

      // Si la categoría es estudiante
      if(i.categoria === 'estudiante') {

        // Incrementa estudiantes
        this.resumencursos[i.curso].estudiantes++;

      // Si la categoría es egresado
      } else if (i.categoria === 'egresado'){

        // Incrementa egresados
        this.resumencursos[i.curso].egresados++;

      // Si es particular
      } else{

        // Incrementa particulares
        this.resumencursos[i.curso].particulares++;
      }

      // Incrementa el total general
      this.resumencursos[i.curso].general++;

    })
  }

}