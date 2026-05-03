import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  cursos = [
    { nombre: 'Angular', precio: 10000 },
    { nombre: 'Java', precio: 15000 },
    { nombre: 'Python', precio: 14000 },
    { nombre: 'C#', precio: 13000 },
    { nombre: 'JavaScript', precio: 11000 }
  ];
}