import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  cursos = [
    { nombre: 'Angular', precio: 10000 },
    { nombre: 'Java', precio: 15000 }
  ];
}