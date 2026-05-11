import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  descripcion: string;
  img: string;
  precio: number;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrls: ['./punto2.css']
})
export class Punto2Component {

  productos: Producto[] = [
    { nombre: 'Notebook ASUS 13L', descripcion: 'Disco 40GB, pantalla 15 pulgadas, ideal para uso diario', img: 'assets/productos/NotebookASUS13L.png', precio: 450.00 },
    { nombre: 'Monitor LG 24"', descripcion: 'Monitor Full HD 24 pulgadas, panel IPS, 75Hz', img: 'assets/productos/MonitorLG24.png', precio: 199.99 },
    { nombre: 'Teclado Mecánico Redragon', descripcion: 'Teclado mecánico RGB, switches blue, USB', img: 'assets/productos/TecladoMecánicoRedragon.png', precio: 89.50 },
    { nombre: 'Mouse Logitech MX', descripcion: 'Mouse inalámbrico ergonómico, 4000 DPI', img: 'assets/productos/MouseLogitechMX.png', precio: 75.00 },
    { nombre: 'Auriculares Sony WH', descripcion: 'Auriculares over-ear con cancelación de ruido activa', img: 'assets/productos/AuricularesSonyWH.png', precio: 320.00 },
    { nombre: 'Webcam Logitech C920', descripcion: 'Cámara Full HD 1080p, ideal para videollamadas', img: 'assets/productos/WebcamLogitechC920.png', precio: 110.00 },
  ];

  carrito: ItemCarrito[] = [];
  modalVisible: boolean = false;

  agregarAlCarrito(producto: Producto): void {
    const item = this.carrito.find(i => i.producto.nombre === producto.nombre);
    if (!item) {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  estaEnCarrito(producto: Producto): boolean {
    return !!this.carrito.find(i => i.producto.nombre === producto.nombre);
  }

  aumentarCantidad(item: ItemCarrito): void {
    item.cantidad++;
  }

  disminuirCantidad(item: ItemCarrito): void {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.eliminarDelCarrito(item);
    }
  }

  eliminarDelCarrito(item: ItemCarrito): void {
    this.carrito = this.carrito.filter(i => i.producto.nombre !== item.producto.nombre);
  }

  get totalItems(): number {
    return this.carrito.reduce((acc, i) => acc + i.cantidad, 0);
  }

  get total(): number {
    return this.carrito.reduce((acc, i) => acc + (i.producto.precio * i.cantidad), 0);
  }

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }
}