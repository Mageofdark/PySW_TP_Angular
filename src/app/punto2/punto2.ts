import { Component } from '@angular/core'; // Importa el decorador Component para crear componentes en Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comunes de Angular (directivas como ngIf, ngFor, etc.)

// Interface que define cómo debe ser un producto
interface Producto {
  nombre: string; // Nombre del producto
  descripcion: string; // Descripción del producto
  img: string; // Ruta de la imagen del producto
  precio: number; // Precio del producto
}

// Interface que define cómo será cada item del carrito
interface ItemCarrito {
  producto: Producto; // Producto agregado al carrito
  cantidad: number; // Cantidad de ese producto
}

@Component({
  selector: 'app-punto2', // Nombre de la etiqueta HTML del componente
  standalone: true, // Indica que el componente es standalone y no necesita módulo
  imports: [CommonModule], // Módulos importados para usar en el HTML
  templateUrl: './punto2.html', // Archivo HTML del componente
  styleUrls: ['./punto2.css'] // Archivo CSS del componente
})
export class Punto2Component {

  // Array que almacena todos los productos disponibles
  productos: Producto[] = [

    // Producto 1
    { 
      nombre: 'Notebook ASUS 13L', // Nombre del producto
      descripcion: 'Disco 40GB, pantalla 15 pulgadas, ideal para uso diario', // Descripción
      img: 'assets/productos/NotebookASUS13L.png', // Imagen
      precio: 450.00 // Precio
    },

    // Producto 2
    { 
      nombre: 'Monitor LG 24"', 
      descripcion: 'Monitor Full HD 24 pulgadas, panel IPS, 75Hz', 
      img: 'assets/productos/MonitorLG24.png', 
      precio: 199.99 
    },

    // Producto 3
    { 
      nombre: 'Teclado Mecánico Redragon', 
      descripcion: 'Teclado mecánico RGB, switches blue, USB', 
      img: 'assets/productos/TecladoMecánicoRedragon.png', 
      precio: 89.50 
    },

    // Producto 4
    { 
      nombre: 'Mouse Logitech MX', 
      descripcion: 'Mouse inalámbrico ergonómico, 4000 DPI', 
      img: 'assets/productos/MouseLogitechMX.png', 
      precio: 75.00 
    },

    // Producto 5
    { 
      nombre: 'Auriculares Sony WH', 
      descripcion: 'Auriculares over-ear con cancelación de ruido activa', 
      img: 'assets/productos/AuricularesSonyWH.png', 
      precio: 320.00 
    },

    // Producto 6
    { 
      nombre: 'Webcam Logitech C920', 
      descripcion: 'Cámara Full HD 1080p, ideal para videollamadas', 
      img: 'assets/productos/WebcamLogitechC920.png', 
      precio: 110.00 
    },
  ];

  // Array que almacenará los productos agregados al carrito
  carrito: ItemCarrito[] = [];

  // Variable booleana para mostrar u ocultar el modal
  modalVisible: boolean = false;

  // Método para agregar productos al carrito
  agregarAlCarrito(producto: Producto): void {

    // Busca si el producto ya existe en el carrito
    const item = this.carrito.find(i => i.producto.nombre === producto.nombre);

    // Si no existe, lo agrega con cantidad 1
    if (!item) {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  // Método que verifica si un producto ya está en el carrito
  estaEnCarrito(producto: Producto): boolean {

    // Devuelve true o false dependiendo si encuentra el producto
    return !!this.carrito.find(i => i.producto.nombre === producto.nombre);
  }

  // Método para aumentar la cantidad de un producto
  aumentarCantidad(item: ItemCarrito): void {

    // Incrementa en 1 la cantidad
    item.cantidad++;
  }

  // Método para disminuir la cantidad de un producto
  disminuirCantidad(item: ItemCarrito): void {

    // Si la cantidad es mayor a 1, resta uno
    if (item.cantidad > 1) {
      item.cantidad--;

    // Si solo queda uno, elimina el producto del carrito
    } else {
      this.eliminarDelCarrito(item);
    }
  }

  // Método para eliminar completamente un producto del carrito
  eliminarDelCarrito(item: ItemCarrito): void {

    // Filtra el carrito eliminando el producto seleccionado
    this.carrito = this.carrito.filter(i => i.producto.nombre !== item.producto.nombre);
  }

  // Getter que calcula la cantidad total de productos en el carrito
  get totalItems(): number {

    // Recorre el carrito y suma las cantidades
    return this.carrito.reduce((acc, i) => acc + i.cantidad, 0);
  }

  // Getter que calcula el precio total del carrito
  get total(): number {

    // Recorre el carrito y suma precio * cantidad
    return this.carrito.reduce((acc, i) => acc + (i.producto.precio * i.cantidad), 0);
  }

  // Método para abrir el modal
  abrirModal(): void {

    // Cambia el estado del modal a visible
    this.modalVisible = true;
  }

  // Método para cerrar el modal
  cerrarModal(): void {

    // Cambia el estado del modal a oculto
    this.modalVisible = false;
  }
}