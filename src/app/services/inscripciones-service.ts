import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private inscripciones: any[] = [];

  agregar(inscripcion: any){
    this.inscripciones.push(inscripcion);
  }
  eliminar(index: number){
    this.inscripciones.splice(index, 1);
  }
  getInscripciones(){
    return this.inscripciones;
  }
  update(index: number, item: any) {
    this.inscripciones[index] = item;
  }
}
