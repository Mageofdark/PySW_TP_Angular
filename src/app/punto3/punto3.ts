import { Component } from '@angular/core';//lo importa desde angular y sirve para crear componentes en angular
import { CommonModule } from '@angular/common';//el commonmodule permite usar directivas como nglf o ngfor

@Component({ //indica que esta clase sera un componente angular
  selector: 'app-punto3', //es el nombre del componente
  standalone: true, //indica que el componente es independiente y no nesecita modulos
  imports: [CommonModule],//importa modulos nesecarios dentro del componente
  templateUrl: './punto3.html',//conecta el componente con el html
  styleUrl: './punto3.css'//conecta el componente con el css
})
export class Punto3 { //Clase principal del componente donde se guarda toda la lógica del juego

  cartas: any[] = []; //array que almacena todas las cartas del juego

  primeraCarta: any = null;//guardan las 2 cartas seleccionadas por el usuario
  segundaCarta: any = null;

  bloquear: boolean = false;//bloquea los click mientras se verifica una jugada

  intentos: number = 10;//cantidads de intentos

  juegoIniciado: boolean = false;//indica si el juego comenzo

  mostrarInicio: boolean = true;//controla la pantalla inicial

  mostrarPreparacion: boolean = false;//controla la pantalla de preparacion

  juegoTerminado: boolean = false;//indica si el juego termino

  victoria: boolean = false;//indica si el jugador gano

  emojis = ['🍎','🍌','🍇','🍉','🍓','🥝'];//el array con los emojis de las cartas

  mostrarPantallaPreparacion(){//funcion que muestra la pantalla de preparacion

    this.mostrarInicio = false;//oculta la pantalla inicial

    this.mostrarPreparacion = true;//muestra la de preparacion

  }

  iniciarJuego() {//inicia el juego

    let pares = [...this.emojis, ...this.emojis];//duplica los emojis para crear parejas

    pares = pares.sort(() => Math.random() - 0.5);//mezcla las cartas aleatoriamente

    this.cartas = pares.map((emoji, index) => ({//recorre el array y crea objetos carta
      id: index,//asigna un id
      emoji: emoji,//guarda el emoji de la carta
      descubierta: false//indica que la carta empieza tapada
    }));

    this.intentos = 10;//reinicia el intento

    this.juegoIniciado = true;//el juego comenzo

    this.mostrarPreparacion = false;//oculta pantalla

    this.juegoTerminado = false;//oculta pantalla

    this.victoria = false;//reinicia el estado de victoria

    this.primeraCarta = null;//limpia las cartas seleccionadas

    this.segundaCarta = null;
  }

  reiniciarJuego() {//reinicia el juego

    this.iniciarJuego();//llama de nuevo a la funcion iniciar juego

  }

  volverInicio(){//vuelve a la pantalla incial

    this.juegoIniciado = false;//detiene el juego

    this.juegoTerminado = false;//reinicia el estado final

    this.mostrarInicio = true;//muestra la pantalla inicial

  }

  intentar(carta:any) {//se ejecuta cuando hacen click en una carta

    if (!this.juegoIniciado) return;//evita jugar si el juego no enpezo

    if (this.bloquear) return;//bloquea click mientras se procesa la jugada

    if (this.juegoTerminado) return;//evista jugar si el juego termino

    if (carta.descubierta) return;//evita seleccionar cartas ya descubiertas

    carta.descubierta = true;//da vuelta la carta seleccionada

    if (!this.primeraCarta) {//verifica si la preimera carta esta seleccionada

      this.primeraCarta = carta;//guarda la primera carta

    } else {

      this.segundaCarta = carta;//guarda la segunda carta

      this.bloquear = true;//bloquea nuevas selecciones temporalmente

      if (this.primeraCarta.emoji === this.segundaCarta.emoji) {//si ambas cartas son iguales

        this.primeraCarta = null;//limpia las cartas seleccionadas

        this.segundaCarta = null;

        this.bloquear = false;//desbloquea el juego

        if (this.cartas.every(c => c.descubierta)) {//si todas las cartas fueron descuviertas

          this.juegoTerminado = true;//termina el juego

          this.victoria = true;//marca que ganó

        }

      } else {

        this.intentos--;//resta un intento

        const carta1 = this.primeraCarta;//las guarda en constantes temporales

        const carta2 = this.segundaCarta;

        setTimeout(() => {//ejecuta el codigo despues de un segundo

          carta1.descubierta = false;//vuelve a tapar las cartas

          carta2.descubierta = false;

          this.primeraCarta = null;//limpia las variables

          this.segundaCarta = null;

          this.bloquear = false;//permite volver a jugar

          if (this.intentos <= 0) {//si los intentos son igual o menor a 0

            this.intentos = 0; //evita numeros negativos

            this.juegoTerminado = true; //termina el juego

          }

        }, 1000);//son 1000 milisegundos osea 1 segundo de espera antes de ejecutar el codigo
      }
    }
  }

}