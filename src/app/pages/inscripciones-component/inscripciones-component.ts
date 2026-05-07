import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos-service';
import { InscripcionesService } from '../../services/inscripciones-service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-inscripciones-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscripciones-component.html',
  styleUrls: ['./inscripciones-component.css'],
  standalone: true,
})

export class InscripcionesComponent implements OnInit{

  inscripciones: {
    dni: string;
    email: string;
    categoria: string;
    curso: string;
    fecha: Date;
    precio: number;
  }[] = [];

  resumencursos: {
    [curso: string]:{
      estudiantes: number;
      egresados: number;
      particulares: number;
      general: number;
    }
  } ={};

  constructor(
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService
  ){}


  ngOnInit(): void{
    this.inscripciones = this.inscripcionesService.getInscripciones();
    this.calcularResumen();
  }

  get cursos(){
    return this.cursosService.cursos;
  }
  
  // FORMULARIO REACTIVO
  form = new FormGroup({
    dni: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    categoria: new FormControl('', [Validators.required]),
    curso: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
  });

  // calcular precio
  precioFinal = 0;
  precioFinalYDivisa = '';

  calcularPrecio() {
    const cursoNombre = this.form.value.curso;

    const curso = this.cursos.find(c => c.nombre === cursoNombre);

    if(!curso) return;

    let precio = curso.precio;

    const categoria = this.form.value.categoria;

    if(categoria === 'estudiante'){
      precio *= 0.65; // 35% de descuento
    }else if(categoria === 'egresado'){
      precio *= 0.5; // 50% de descuento
    }// else -> no hay descuento porque es particular

    this.precioFinal = precio;
    this.precioFinalYDivisa = precio + " ARS";
  }

  registrar(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      console.log('Datos form: ', this.form.value, this.precioFinal);
      alert('NO SE ENVIO')
      return;
    }

    const inscripcion = {
      dni: this.form.value.dni!,
      email: this.form.value.email!,
      categoria: this.form.value.categoria!,
      curso: this.form.value.curso!,
      fecha: new Date(this.form.value.fecha!),
      precio: this.precioFinal
    }
    this.inscripcionesService.agregar(inscripcion);
    console.log('Datos form: ', this.form.value, this.precioFinal);
    console.log('Array inscripciones', this.inscripcionesService.getInscripciones());
    this.inscripciones = this.inscripcionesService.getInscripciones();
    this.calcularResumen();

    alert('ENVIADO')

    this.form.reset();
    this.precioFinal = 0;
    this.precioFinalYDivisa = '';
    return;

  }

  calcularResumen(){
    this.resumencursos = {};

    this.inscripciones.forEach(i => {
      if(!this.resumencursos[i.curso]){
        this.resumencursos[i.curso] = {
          estudiantes: 0,
          egresados: 0,
          particulares: 0,
          general: 0
        }; 
      }

      if(i.categoria === 'estudiante') {
        this.resumencursos[i.curso].estudiantes++;
      } else if (i.categoria === 'egresado'){
        this.resumencursos[i.curso].egresados++;
      } else{
        this.resumencursos[i.curso].particulares++;
      }
      this.resumencursos[i.curso].general++;

    })
    }

}
