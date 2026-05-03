import { Component } from '@angular/core';
import { CursosService } from '../../services/cursos';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css',
})
export class InscripcionesComponent {
  constructor(private cursosService: CursosService) {}
  
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

  calcularPrecio() {
    const cursoNombre = this.form.value.curso;

    const curso = this.cursos.find(c => c.nombre === cursoNombre);

    if(!curso) return;

    let precio = curso.precio;

    const categoria = this.form.value.categoria;

    if(categoria === 'estudiante'){
      precio *= 0.65;
    }else if(categoria === 'egresado'){
      precio *= 0.5;
    }// else -> no hay descuento porque es particular

    this.precioFinal = precio;
  }

  registrar(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      console.log('NO SE ENVIO', this.form.value, this.precioFinal);
      alert('ENVIADO')
      return;
    }

    console.log('ENVIADO', this.form.value, this.precioFinal);
    alert('enviado')

    this.form.reset();
    this.precioFinal = 0;
    return;
  }
}
