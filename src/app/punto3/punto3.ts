import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css'
})
export class Punto3 {

  cartas: any[] = [];

  primeraCarta: any = null;
  segundaCarta: any = null;

  bloquear: boolean = false;

  intentos: number = 10;

  juegoIniciado: boolean = false;

  mostrarInicio: boolean = true;

  mostrarPreparacion: boolean = false;

  juegoTerminado: boolean = false;

  victoria: boolean = false;

  emojis = ['🍎','🍌','🍇','🍉','🍓','🥝'];

  mostrarPantallaPreparacion(){

    this.mostrarInicio = false;

    this.mostrarPreparacion = true;

  }

  iniciarJuego() {

    let pares = [...this.emojis, ...this.emojis];

    pares = pares.sort(() => Math.random() - 0.5);

    this.cartas = pares.map((emoji, index) => ({
      id: index,
      emoji: emoji,
      descubierta: false
    }));

    this.intentos = 10;

    this.juegoIniciado = true;

    this.mostrarPreparacion = false;

    this.juegoTerminado = false;

    this.victoria = false;

    this.primeraCarta = null;

    this.segundaCarta = null;
  }

  reiniciarJuego() {

    this.iniciarJuego();

  }

  volverInicio(){

    this.juegoIniciado = false;

    this.juegoTerminado = false;

    this.mostrarInicio = true;

  }

  intentar(carta:any) {

    if (!this.juegoIniciado) return;

    if (this.bloquear) return;

    if (this.juegoTerminado) return;

    if (carta.descubierta) return;

    carta.descubierta = true;

    if (!this.primeraCarta) {

      this.primeraCarta = carta;

    } else {

      this.segundaCarta = carta;

      this.bloquear = true;

      if (this.primeraCarta.emoji === this.segundaCarta.emoji) {

        this.primeraCarta = null;

        this.segundaCarta = null;

        this.bloquear = false;

        if (this.cartas.every(c => c.descubierta)) {

          this.juegoTerminado = true;

          this.victoria = true;

        }

      } else {

        this.intentos--;

        const carta1 = this.primeraCarta;

        const carta2 = this.segundaCarta;

        setTimeout(() => {

          carta1.descubierta = false;

          carta2.descubierta = false;

          this.primeraCarta = null;

          this.segundaCarta = null;

          this.bloquear = false;

          if (this.intentos <= 0) {

            this.intentos = 0;

            this.juegoTerminado = true;

          }

        }, 1000);
      }
    }
  }

}